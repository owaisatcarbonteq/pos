"use client"

import { calculateOrder } from "@/actions/square.action"
import { CartContext } from "@/context/cart.context"
import { OrderContext } from "@/context/order.context"
import { CatalogItem, Discount } from "@/types/square"
import {
  ReactNode,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react"
import { Square } from "square"

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const cartContext = useContext(CartContext) // Access cart items
  if (!cartContext) {
    throw new Error("OrderProvider must be used within a CartProvider")
  }
  const { items } = cartContext
  const [order, setOrder] = useState<Square.Order>()
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [lineItems, setLineItems] = useState<Square.OrderLineItem[]>()

  const [calculating, startTransition] = useTransition()

  const updateOrder = async (discounts?: Discount[]) => {
    const lineItems: Square.OrderLineItem[] = items.map((i) => {
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
    setLineItems(lineItems)
    startTransition(async () => {
      const calculated = await calculateOrder(lineItems, discounts)
      setOrder(calculated)
    })
  }

  const addDiscount = (d: Discount) => {
    setDiscounts((prev) => [...prev, d])
  }

  const removeDiscount = (d: Discount["id"]) => {
    setDiscounts((prev) => prev.filter((p) => p.id !== d))
  }

  useEffect(() => {
    updateOrder(discounts)
  }, [items, discounts])

  return (
    <OrderContext.Provider
      value={{
        order,
        discounts,
        addDiscount,
        removeDiscount,
        calculating,
        lineItems,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
