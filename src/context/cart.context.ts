import { CartItem, Product } from "@/types/square"
import { createContext } from "react"

type CartContextType = {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)
