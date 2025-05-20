"use client"

import { create } from "zustand"
import { CartItem } from "@/types/square"

export interface CartState {
  items: CartItem[]
  addToCart: (params: {
    product: CartItem["product"]
    variationId: string
    quantity?: number
  }) => void
  removeFromCart: (params: {
    productId: string
    variationId: string
    quantity?: number
  }) => void
  clearFromCart: (params: { productId: string; variationId: string }) => void
  getQuantity: (params: { productId: string; variationId: string }) => number
  clearCart: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: ({ product, variationId, quantity = 1 }) => {
    set((state) => {
      const existing = state.items.find(
        (i) => i.product.id === product.id && i.variationId === variationId
      )

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id && i.variationId === variationId
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        }
      }

      return {
        items: [...state.items, { product, quantity: quantity, variationId }],
      }
    })
  },
  removeFromCart: ({ productId, variationId, quantity = 1 }) => {
    set((state) => {
      const existing = state.items.find(
        (i) => i.product.id === productId && i.variationId === variationId
      )

      if (existing && existing.quantity > quantity) {
        return {
          items: state.items.map((i) =>
            i.product.id === productId && i.variationId === variationId
              ? { ...i, quantity: i.quantity - quantity }
              : i
          ),
        }
      }

      return {
        items: state.items.filter(
          (i) => i.product.id !== productId || i.variationId !== variationId
        ),
      }
    })
  },
  clearFromCart: ({ productId, variationId }) => {
    set((state) => ({
      items: state.items.filter(
        (i) => i.product.id !== productId || i.variationId !== variationId
      ),
    }))
  },
  getQuantity: ({ productId, variationId }) => {
    const { items } = get()
    return (
      items.find(
        (c) => c.product.id === productId && c.variationId === variationId
      )?.quantity ?? 0
    )
  },
  clearCart: () => set({ items: [] }),
}))
