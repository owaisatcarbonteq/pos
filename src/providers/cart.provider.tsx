"use client"

import { CartContext, CartContextType } from "@/context/cart.context"
import { CartItem } from "@/types/square"
import { ReactNode, useState } from "react"

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart: CartContextType["addToCart"] = ({
    product,
    variationId,
    quantity,
  }) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.variationId === variationId
      )
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.variationId === variationId
            ? { ...i, quantity: i.quantity + (quantity ?? 1) }
            : i
        )
      }
      return [...prev, { product, quantity: 1, variationId }]
    })
  }

  const removeFromCart: CartContextType["removeFromCart"] = ({
    productId,
    variationId,
    quantity,
  }) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === productId && i.variationId === variationId
      )
      if (existing && existing.quantity > 1) {
        return prev.map((i) =>
          i.product.id === productId && i.variationId === variationId
            ? { ...i, quantity: i.quantity - (quantity ?? 1) }
            : i
        )
      }
      return prev.filter(
        (i) => i.product.id !== productId || i.variationId !== variationId
      )
    })
  }

  const clearFromCart: CartContextType["clearFromCart"] = ({
    productId,
    variationId,
  }) => {
    setItems((prev) =>
      prev.filter(
        (i) => i.product.id !== productId || i.variationId !== variationId
      )
    )
  }

  const getQuantity: CartContextType["getQuantity"] = ({
    productId,
    variationId,
  }) => {
    return (
      items.find(
        (c) => c.product.id === productId && c.variationId === variationId
      )?.quantity ?? 0
    )
  }

  const clearCart = () => setItems([])

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearFromCart,
        clearCart,
        getQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
