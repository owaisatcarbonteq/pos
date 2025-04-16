import { Square } from "square"

export type Product = {
  created_at: Date | string
  updatedAt: Date | string
  id: string
  isDeleted: boolean
  itemData: Square.CatalogItem & { images?: { id: string; url: string }[] }
  type: Square.CatalogObjectType
  presentAtAllLocations: boolean
}

export type CartItem = {
  product: Product
  quantity: number
}
