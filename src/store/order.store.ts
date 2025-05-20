"use client"

import { calculateOrder } from "@/actions/square.action"
import { useCartStore } from "@/store/cart.store"
import { CartItem, CatalogItem, Discount } from "@/types/square"
import { create } from "zustand"
import { Square } from "square"
import { useEffect } from "react"
import { useMutation } from "@tanstack/react-query"

export interface OrderState {
  order: Square.Order | undefined
  discounts: Discount[]
  lineItems: Square.OrderLineItem[] | undefined
  calculating: boolean

  addDiscount: (discount: Discount) => void
  removeDiscount: (
    discountId: Discount["id"],
    lineItemId?: Square.OrderLineItem["uid"]
  ) => void
  setCalculating: (calculating: boolean) => void
  setOrder: (order: Square.Order | undefined) => void
  setLineItems: (lineItems: Square.OrderLineItem[] | undefined) => void
}

export const useOrderStore = create<OrderState>((set) => ({
  order: undefined,
  discounts: [],
  lineItems: undefined,
  calculating: false,

  addDiscount: (discount) => {
    set((state) => {
      const newDiscount = {
        ...discount,
        enabledFor: discount.appliedTo ?? state.lineItems?.map((li) => li.uid),
      } as Discount
      return {
        discounts: [
          ...state.discounts.filter((d) => d.id !== discount.id),
          newDiscount,
        ].toSorted((a, b) =>
          a.id.toUpperCase() < b.id.toUpperCase()
            ? -1
            : a.id.toUpperCase() > b.id.toUpperCase()
            ? 1
            : 0
        ),
      }
    })
  },

  removeDiscount: (discountId, lineItemId = null) => {
    set((state) => {
      if (!lineItemId) {
        return { discounts: state.discounts.filter((d) => d.id !== discountId) }
      }
      const currentDiscount = state.discounts.find((d) => d.id === discountId)
      if (
        currentDiscount?.enabledFor?.includes(lineItemId) &&
        currentDiscount.enabledFor.length === 1
      ) {
        return { discounts: state.discounts.filter((d) => d.id !== discountId) }
      }
      const updatedDiscount = {
        ...currentDiscount,
        enabledFor: currentDiscount?.enabledFor?.filter(
          (e) => e !== lineItemId
        ),
      } as Discount
      return {
        discounts: [
          ...state.discounts.filter((d) => d.id !== discountId),
          updatedDiscount,
        ].toSorted((a, b) =>
          a.id.toUpperCase() < b.id.toUpperCase()
            ? -1
            : a.id.toUpperCase() > b.id.toUpperCase()
            ? 1
            : 0
        ),
      }
    })
  },

  setCalculating: (calculating) => set({ calculating }),
  setOrder: (order) => set({ order }),
  setLineItems: (lineItems) => set({ lineItems }),
}))

function buildLineItems(items: CartItem[]): Square.OrderLineItem[] {
  return items.map((i) => {
    const priceMoney: Square.Money | undefined =
      i.product.itemData.variations?.find((v) => v.id === i.variationId)
        ?.itemVariationData?.priceMoney

    return {
      uid: i.variationId,
      catalogObjectId: i.variationId,
      name: i.product.itemData.name,
      variationName: (i.product as CatalogItem).itemData?.variations?.find(
        (v) => v.id === i.variationId
      )?.itemVariationData?.name,
      quantity: `${i.quantity}`,
      basePriceMoney: {
        amount: BigInt(priceMoney?.amount ?? 0),
        currency: priceMoney?.currency,
      },
    }
  })
}

export function useOrder() {
  const { items } = useCartStore()
  const { discounts, removeDiscount, setCalculating, setOrder, ...storeRest } =
    useOrderStore()

  const mutation = useMutation({
    mutationFn: async () => {
      const cartItems = useCartStore.getState().items
      const currentDiscounts = useOrderStore.getState().discounts

      const lineItems = buildLineItems(cartItems)

      const cartVariationIds = cartItems.map((item) => item.variationId)

      const discountsToCull = currentDiscounts.flatMap((d) => {
        const missingItemIds = d.enabledFor?.filter(
          (e) => !cartVariationIds.includes(e)
        )
        return (
          missingItemIds?.map((i) => ({
            discountId: d.id,
            lineItemId: i,
          })) ?? []
        )
      })

      discountsToCull?.forEach(({ discountId, lineItemId }) =>
        removeDiscount(discountId, lineItemId)
      )

      useOrderStore.getState().setLineItems(lineItems)

      return await calculateOrder(lineItems, currentDiscounts)
    },
    onMutate: () => {
      setCalculating(true)
    },
    onSuccess: (order) => {
      setOrder(order)
    },
    onError: (err) => {
      console.error("Failed to calculate order:", err.message)
    },
    onSettled: () => {
      setCalculating(false)
    },
  })

  useEffect(() => {
    mutation.mutate()
  }, [items, discounts])

  return {
    ...storeRest,
    discounts,
    removeDiscount,
    lineItems: useOrderStore.getState().lineItems,
    order: useOrderStore.getState().order,
    calculating: mutation.isPending,
    updateOrder: mutation.mutate,
  }
}
