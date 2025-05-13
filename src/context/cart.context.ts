import { CartItem, Product } from "@/types/square"
import { createContext } from "react"

type AddToCartProps = {
  product: Product
  variationId: string
  quantity?: number
}

type RemoveFromCartProps = {
  productId: string
  variationId: string
  quantity?: number
}

type GetQuantityProps = RemoveFromCartProps

type ClearFromCartProps = RemoveFromCartProps

export type CartContextType = {
  items: CartItem[]
  addToCart: (props: AddToCartProps) => void
  removeFromCart: (props: RemoveFromCartProps) => void
  clearFromCart: (props: ClearFromCartProps) => void
  getQuantity: (props: GetQuantityProps) => number
  clearCart: () => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)
