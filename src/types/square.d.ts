import { Square } from "square"

export type Product = {
  created_at: Date | string
  updatedAt: Date | string
  id: string
  isDeleted: boolean
  itemData: CustomItemData
  type: Square.CatalogObjectType
  presentAtAllLocations: boolean
}

export type CartItem = {
  product: Product
  variationId: string
  quantity: number
}

export type Discount = Square.CatalogDiscount & {
  id: string
  appliedTo?: string[]
}

type NonNullableItemData = NonNullable<Square.CatalogObjectItem["itemData"]>

type Overwrite<T, U> = Omit<T, keyof U> & U

type CustomItemData = Overwrite<
  NonNullableItemData,
  {
    images?: { id: string; url: string }[]
    variations?: Square.CatalogObjectItemVariation[] | null
    variationImages?: { id: string; url: string }[]
  }
>

export type CatalogItem = Overwrite<
  Square.CatalogObjectItem,
  {
    itemData: CustomItemData | null // rewrap in nullable
  }
>
