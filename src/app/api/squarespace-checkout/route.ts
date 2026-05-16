import { NextResponse } from 'next/server'
import { packages } from '@/data/packages'
import { getCheckoutFields } from '@/data/checkoutFields'

type CheckoutForm = {
  firstName?: string
  lastName?: string
  email?: string
  meetDetails?: string
  clothing?: string
  song?: string
  attemptWeightPreference?: string
  phone?: string
  notes?: string
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

    if (!pkg) {
      return NextResponse.json({ error: 'Package not found.' }, { status: 404 })
    }

    const form = normalizeForm(body.form)
    const checkoutFields = getCheckoutFields(pkg.id)
    const validationError = validateRequiredFields(checkoutFields, form)
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const productUrl = pkg.squarespaceUrl
    const productResponse = await fetch(`${productUrl}?format=json`, {
      headers: {
        accept: 'application/json',
        'user-agent': 'Mozilla/5.0',
      },
      cache: 'no-store',
    })

    if (!productResponse.ok) {
      return NextResponse.json(
        { error: 'Could not load the Squarespace product.' },
        { status: 502 },
      )
    }

    const crumb = productResponse.headers.get('set-cookie')?.match(/crumb=([^;]+)/)?.[1]
    const product = (await productResponse.json()) as SquarespaceProduct
    const variant = product.item.variants?.[0]

    if (!crumb || !variant?.sku) {
      return NextResponse.json(
        { error: 'Squarespace checkout details are unavailable for this product.' },
        { status: 502 },
      )
    }

    const additionalFields = buildAdditionalFields(checkoutFields, form)
    const addToCartId = crypto.randomUUID()

    const cartResponse = await fetch('https://www.vincentlomedia.com/api/commerce/shopping-cart/entries', {
      method: 'POST',
      headers: {
        'add-to-cart-id': addToCartId,
        'content-type': 'application/json',
        cookie: `crumb=${crumb}`,
        origin: 'https://www.vincentlomedia.com',
        referer: productUrl,
        'user-agent': 'Mozilla/5.0',
        'x-csrf-token': crumb,
      },
      body: JSON.stringify({
        itemId: product.item.id,
        sku: variant.sku,
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

      return NextResponse.json(
        {
          error: squarespaceMessage || 'Squarespace could not create a checkout cart.',
          productUrl,
        },
        { status: 502 },
      )
    }

    return NextResponse.json({
      checkoutUrl: `https://www.vincentlomedia.com/checkout?cartToken=${encodeURIComponent(
        cartJson.shoppingCart.cartToken,
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
    meetDetails: form?.meetDetails?.trim() ?? '',
    clothing: form?.clothing?.trim() ?? '',
    song: form?.song?.trim() ?? '',
    attemptWeightPreference: form?.attemptWeightPreference?.trim() ?? '',
    phone: form?.phone?.trim() ?? '',
    notes: form?.notes?.trim() ?? '',
  }
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
