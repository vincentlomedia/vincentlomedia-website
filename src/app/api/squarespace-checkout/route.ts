import { NextResponse } from 'next/server'
import {
  canAddExpressDelivery,
  EXPRESS_DELIVERY_PACKAGE_ID,
  packages,
} from '@/data/packages'
import { getCheckoutFields } from '@/data/checkoutFields'

type CheckoutForm = {
  firstName?: string
  lastName?: string
  email?: string
  competitionName?: string
  meetDetails?: string
  clothing?: string
  song?: string
  attemptWeightPreference?: string
  phone?: string
  notes?: string
  expressDelivery?: boolean
}

type SquarespaceProduct = {
  item: {
    id: string
    title: string
    additionalFieldsForm?: {
      fields?: string[]
    }
    variants?: Array<{
      sku?: string
    }>
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { packageId?: string; form?: CheckoutForm }
    const pkg = packages.find((item) => item.id === body.packageId)
    const expressPackage = packages.find((item) => item.id === EXPRESS_DELIVERY_PACKAGE_ID)

    if (!pkg) {
      return NextResponse.json({ error: 'Package not found.' }, { status: 404 })
    }

    const form = normalizeForm(body.form)
    if (form.expressDelivery && !canAddExpressDelivery(pkg.id)) {
      return NextResponse.json(
        { error: 'Express Delivery is not available for this package.' },
        { status: 400 },
      )
    }

    if (form.expressDelivery && !expressPackage) {
      return NextResponse.json(
        { error: 'Express Delivery checkout details are unavailable.' },
        { status: 502 },
      )
    }

    const checkoutFields = getCheckoutFields(pkg.id)
    const validationError = validateRequiredFields(checkoutFields, form)
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const productDetails = await loadSquarespaceProduct(pkg.squarespaceUrl)

    const additionalFields = buildAdditionalFields(checkoutFields, form)
    const cart = await addSquarespaceCartEntry({
      details: productDetails,
      additionalFields,
    })

    if (!cart.ok) {
      return NextResponse.json(
        {
          error: cart.error || 'Squarespace could not create a checkout cart.',
          productUrl: pkg.squarespaceUrl,
        },
        { status: 502 },
      )
    }

    let checkoutCartToken = cart.cartToken
    let cartCookie = cart.cookie

    if (form.expressDelivery && expressPackage) {
      const expressDetails = await loadSquarespaceProduct(expressPackage.squarespaceUrl)
      const expressCart = await addSquarespaceCartEntry({
        details: expressDetails,
        cartCookie,
      })

      if (!expressCart.ok) {
        return NextResponse.json(
          {
            error:
              expressCart.error ||
              'The main package was added, but Squarespace could not add Express Delivery.',
            productUrl: pkg.squarespaceUrl,
          },
          { status: 502 },
        )
      }

      checkoutCartToken = expressCart.cartToken
      cartCookie = expressCart.cookie || cartCookie
    }

    return NextResponse.json({
      checkoutUrl: `${getSquarespaceStoreOrigin()}/checkout?cartToken=${encodeURIComponent(
        checkoutCartToken,
      )}`,
    })
  } catch (error) {
    console.error('Squarespace checkout error', error)
    return NextResponse.json(
      { error: 'Checkout could not be started. Please try the product page instead.' },
      { status: 500 },
    )
  }
}

function normalizeForm(form: CheckoutForm | undefined) {
  return {
    firstName: form?.firstName?.trim() ?? '',
    lastName: form?.lastName?.trim() ?? '',
    email: form?.email?.trim() ?? '',
    competitionName: form?.competitionName?.trim() ?? '',
    meetDetails: form?.meetDetails?.trim() ?? '',
    clothing: form?.clothing?.trim() ?? '',
    song: form?.song?.trim() ?? '',
    attemptWeightPreference: form?.attemptWeightPreference?.trim() ?? '',
    phone: form?.phone?.trim() ?? '',
    notes: form?.notes?.trim() ?? '',
    expressDelivery: form?.expressDelivery === true,
  }
}

async function loadSquarespaceProduct(productUrl: string) {
  const resolvedProductUrl = resolveSquarespaceStoreUrl(productUrl)
  const productResponse = await fetch(`${resolvedProductUrl}?format=json`, {
    headers: {
      accept: 'application/json',
      'user-agent': 'Mozilla/5.0',
    },
    cache: 'no-store',
  })

  if (!productResponse.ok) {
    throw new Error('Could not load the Squarespace product.')
  }

  const cookie = productResponse.headers.get('set-cookie') ?? ''
  const crumb = cookie.match(/crumb=([^;]+)/)?.[1]
  const product = (await productResponse.json()) as SquarespaceProduct
  const variant = product.item.variants?.[0]

  if (!crumb || !variant?.sku) {
    throw new Error('Squarespace checkout details are unavailable for this product.')
  }

  return {
    productUrl: resolvedProductUrl,
    crumb,
    cookie: cookieHeaderFromSetCookie(cookie),
    itemId: product.item.id,
    sku: variant.sku,
  }
}

async function addSquarespaceCartEntry({
  details,
  additionalFields = {},
  cartCookie = '',
}: {
  details: Awaited<ReturnType<typeof loadSquarespaceProduct>>
  additionalFields?: Record<string, string | string[]>
  cartCookie?: string
}) {
  const cookie = [details.cookie, cartCookie].filter(Boolean).join('; ')
  const storeOrigin = getSquarespaceStoreOrigin()
  const cartResponse = await fetch(`${storeOrigin}/api/commerce/shopping-cart/entries`, {
    method: 'POST',
    headers: {
      'add-to-cart-id': crypto.randomUUID(),
      'content-type': 'application/json',
      cookie,
      origin: storeOrigin,
      referer: details.productUrl,
      'user-agent': 'Mozilla/5.0',
      'x-csrf-token': details.crumb,
    },
    body: JSON.stringify({
      itemId: details.itemId,
      sku: details.sku,
      quantity: 1,
      additionalFields: JSON.stringify(additionalFields),
    }),
  })

  const cartText = await cartResponse.text()
  let cartJson: any = null
  try {
    cartJson = JSON.parse(cartText)
  } catch {
    cartJson = null
  }

  if (!cartResponse.ok || !cartJson?.shoppingCart?.cartToken) {
    const squarespaceMessage =
      cartJson?.error === 'Form Errors'
        ? parseFormError(cartJson.errors)
        : cartJson?.message || cartJson?.error

    return {
      ok: false,
      error: squarespaceMessage || 'Squarespace could not create a checkout cart.',
      cartToken: '',
      cookie: '',
    }
  }

  const responseCookie = cookieHeaderFromSetCookie(cartResponse.headers.get('set-cookie') ?? '')

  return {
    ok: true,
    cartToken: cartJson.shoppingCart.cartToken as string,
    cookie: [cookie, responseCookie].filter(Boolean).join('; '),
  }
}

function resolveSquarespaceStoreUrl(productUrl: string) {
  const storeOrigin = process.env.SQUARESPACE_STORE_ORIGIN?.replace(/\/$/, '')
  if (!storeOrigin) return productUrl

  const url = new URL(productUrl)
  return `${storeOrigin}${url.pathname}${url.search}${url.hash}`
}

function getSquarespaceStoreOrigin() {
  return process.env.SQUARESPACE_STORE_ORIGIN?.replace(/\/$/, '') ?? 'https://www.vincentlomedia.com'
}

function cookieHeaderFromSetCookie(setCookie: string) {
  return setCookie
    .split(/,(?=[^;,]+=)/)
    .map((cookie) => cookie.split(';')[0]?.trim())
    .filter(Boolean)
    .join('; ')
}

function validateRequiredFields(
  fields: ReturnType<typeof getCheckoutFields>,
  form: ReturnType<typeof normalizeForm>,
) {
  const missing = fields.filter((field) => {
    if (!field.required) return false
    if (field.key === 'fullName') return !form.firstName || !form.lastName
    return !form[field.key]
  })

  if (!missing.length) return ''

  return `Please complete: ${missing.map((field) => field.label).join(', ')}.`
}

function buildAdditionalFields(
  fields: ReturnType<typeof getCheckoutFields>,
  form: ReturnType<typeof normalizeForm>,
) {
  return fields.reduce<Record<string, string | string[]>>((values, field) => {
    if (field.key === 'fullName') {
      values[field.squarespaceFieldId] = [form.firstName, form.lastName]
      return values
    }

    if (field.type === 'phone') {
      values[field.squarespaceFieldId] = ['US', '1', form.phone.replace(/\D/g, ''), '']
      return values
    }

    values[field.squarespaceFieldId] = form[field.key]

    return values
  }, {})
}

function parseFormError(errors: unknown) {
  if (typeof errors !== 'string') return undefined

  try {
    const parsed = JSON.parse(errors) as Record<string, string>
    return Object.values(parsed).join(' ')
  } catch {
    return undefined
  }
}
