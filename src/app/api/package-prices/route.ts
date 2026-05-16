import { NextResponse } from 'next/server'
import { packages } from '@/data/packages'
import type { PackagePrice, PackagePricesResponse } from '@/lib/packagePricing'

export const dynamic = 'force-dynamic'

const SQUARESPACE_PRODUCTS_URL = 'https://api.squarespace.com/v2/commerce/products'
const CACHE_TTL_MS = 5 * 60 * 1000

type PriceMoney = {
  currency?: string
  value?: number | string
}

type PublicSquarespacePrice = {
  price?: number
  salePrice?: number
  priceMoney?: PriceMoney
  salePriceMoney?: PriceMoney
  onSale?: boolean
}

type PublicSquarespaceProduct = PublicSquarespacePrice & {
  structuredContent?: PublicSquarespacePrice & {
    variants?: PublicSquarespacePrice[]
  }
  variants?: PublicSquarespacePrice[]
}

type PublicSquarespaceProductPage = {
  item?: PublicSquarespaceProduct
}

type PricingShape = {
  basePrice?: PriceMoney | Wrapped<PriceMoney>
  salePrice?: PriceMoney | Wrapped<PriceMoney>
  onSale?: boolean | Wrapped<boolean>
}

type Wrapped<T> = {
  present?: boolean
  value?: T
}

type SquarespaceProduct = {
  id?: string
  name?: string
  title?: string
  urlSlug?: string
  url?: string
  pricing?: PricingShape | Wrapped<PricingShape>
  variants?: Array<{
    id?: string
    sku?: string
    pricing?: PricingShape | Wrapped<PricingShape>
    basePrice?: PriceMoney
    salePrice?: PriceMoney
    onSale?: boolean
  }>
}

type SquarespaceProductPage = {
  products?: SquarespaceProduct[]
  result?: SquarespaceProduct[]
  items?: SquarespaceProduct[]
  pagination?: {
    nextPageCursor?: string
  }
  cursor?: string
  nextPageCursor?: string
}

let freshCache:
  | {
      expiresAt: number
      response: PackagePricesResponse
    }
  | undefined

let lastKnownGood: Record<string, PackagePrice> = {}

export async function GET() {
  if (freshCache && freshCache.expiresAt > Date.now()) {
    return NextResponse.json(freshCache.response)
  }

  try {
    const response = await loadCurrentSquarespacePrices()
    freshCache = {
      expiresAt: Date.now() + CACHE_TTL_MS,
      response,
    }

    for (const [packageId, price] of Object.entries(response.prices)) {
      if (price) lastKnownGood[packageId] = price
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Squarespace price fetch error', error)
    return NextResponse.json(buildLastKnownResponse())
  }
}

async function loadCurrentSquarespacePrices(): Promise<PackagePricesResponse> {
  const apiKey = process.env.SQUARESPACE_API_KEY

  if (!apiKey) {
    return loadPublicSquarespacePrices()
  }

  const squarespaceProducts = await loadSquarespaceProducts(apiKey)
  const bySlug = new Map(
    squarespaceProducts
      .map((product) => [normalizeSlug(product.urlSlug ?? product.url), product] as const)
      .filter(([slug]) => Boolean(slug)),
  )
  const fetchedAt = new Date().toISOString()

  return {
    prices: Object.fromEntries(
      packages.map((pkg) => {
        const product = bySlug.get(slugFromProductUrl(pkg.squarespaceUrl))
        const price = product ? normalizePrice(product, fetchedAt, 'squarespace') : null
        return [pkg.id, price]
      }),
    ),
  }
}

async function loadPublicSquarespacePrices(): Promise<PackagePricesResponse> {
  const fetchedAt = new Date().toISOString()
  const entries = await Promise.all(
    packages.map(async (pkg) => {
      const product = await loadPublicSquarespaceProduct(pkg.squarespaceUrl)
      return [pkg.id, normalizePublicPrice(product, fetchedAt)] as const
    }),
  )

  return {
    prices: Object.fromEntries(entries),
  }
}

async function loadPublicSquarespaceProduct(productUrl: string) {
  const url = new URL(productUrl)
  url.searchParams.set('format', 'json')

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'Vincent Lo Media pricing sync',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Squarespace product page returned ${response.status}.`)
  }

  return ((await response.json()) as PublicSquarespaceProductPage).item
}

async function loadSquarespaceProducts(apiKey: string) {
  const products: SquarespaceProduct[] = []
  let cursor: string | undefined

  do {
    const url = new URL(SQUARESPACE_PRODUCTS_URL)
    if (cursor) url.searchParams.set('cursor', cursor)

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
        'User-Agent': 'Vincent Lo Media pricing sync',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Squarespace Products API returned ${response.status}.`)
    }

    const page = (await response.json()) as SquarespaceProductPage
    products.push(...(page.products ?? page.result ?? page.items ?? []))
    cursor = page.pagination?.nextPageCursor ?? page.nextPageCursor ?? page.cursor
  } while (cursor)

  return products
}

function normalizePrice(
  product: SquarespaceProduct,
  fetchedAt: string,
  source: PackagePrice['source'],
): PackagePrice | null {
  const variantPricing = product.variants
    ?.map((variant) =>
      unwrapPricing(variant.pricing) ?? {
        basePrice: variant.basePrice,
        salePrice: variant.salePrice,
        onSale: variant.onSale,
      },
    )
    .find((pricing) => normalizeMoney(unwrap(pricing.basePrice)))
  const pricing = variantPricing ?? unwrapPricing(product.pricing)

  if (!pricing) return null

  const basePrice = normalizeMoney(unwrap(pricing.basePrice))
  if (!basePrice) return null

  const salePrice = normalizeMoney(unwrap(pricing.salePrice))
  const onSale = unwrap(pricing.onSale) === true

  return {
    basePrice: basePrice.value,
    ...(salePrice ? { salePrice: salePrice.value } : {}),
    onSale,
    currency: basePrice.currency,
    fetchedAt,
    source,
  }
}

function normalizePublicPrice(
  product: PublicSquarespaceProduct | undefined,
  fetchedAt: string,
): PackagePrice | null {
  if (!product) return null

  const structuredProduct = product.structuredContent ?? product
  const variantPricing = structuredProduct.variants?.find((variant) => normalizePublicMoney(variant))
  const pricing = variantPricing ?? structuredProduct
  const basePrice = normalizePublicMoney(pricing)

  if (!basePrice) return null

  const salePrice = normalizePublicMoney({
    price: pricing.salePrice,
    priceMoney: pricing.salePriceMoney,
  })

  return {
    basePrice: basePrice.value,
    ...(salePrice ? { salePrice: salePrice.value } : {}),
    onSale: pricing.onSale === true,
    currency: basePrice.currency,
    fetchedAt,
    source: 'squarespace',
  }
}

function buildLastKnownResponse(): PackagePricesResponse {
  return {
    prices: Object.fromEntries(
      packages.map((pkg) => {
        const price = lastKnownGood[pkg.id]
        return [
          pkg.id,
          price
            ? {
                ...price,
                source: 'last-known' as const,
              }
            : null,
        ]
      }),
    ),
  }
}

function unwrapPricing(value: PricingShape | Wrapped<PricingShape> | undefined) {
  return unwrap(value)
}

function unwrap<T>(value: T | Wrapped<T> | undefined): T | undefined {
  if (!value || typeof value !== 'object') return value
  if ('value' in value && ('present' in value || Object.keys(value).length === 1)) {
    return value.value
  }
  return value as T
}

function normalizeMoney(value: PriceMoney | undefined) {
  if (!value) return null

  const amount = typeof value.value === 'string' ? Number(value.value) : value.value
  const currency = value.currency

  if (typeof amount !== 'number' || Number.isNaN(amount) || !currency) return null

  return {
    value: amount,
    currency,
  }
}

function normalizePublicMoney(value: PublicSquarespacePrice | undefined) {
  if (!value) return null

  const money = normalizeMoney(value.priceMoney)
  if (money) return money

  if (typeof value.price === 'number' && value.price > 0) {
    return {
      value: value.price / 100,
      currency: 'CAD',
    }
  }

  return null
}

function slugFromProductUrl(productUrl: string) {
  return normalizeSlug(productUrl.split('/store/p/')[1]?.split(/[?#]/)[0])
}

function normalizeSlug(value: string | undefined) {
  return value?.replace(/^\/?store\/p\//, '').replace(/^\/+|\/+$/g, '')
}
