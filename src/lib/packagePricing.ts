export type PackagePriceSource = 'squarespace' | 'last-known' | 'catalog'

export type PackagePrice = {
  basePrice: number
  salePrice?: number
  onSale: boolean
  currency: string
  fetchedAt: string
  source: PackagePriceSource
}

export type PackagePricesResponse = {
  prices: Record<string, PackagePrice | null>
}
