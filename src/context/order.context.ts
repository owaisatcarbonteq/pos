import { Discount } from "@/types/square"
import { createContext } from "react"
import { Square } from "square"

export type OrderContextType = {
  order: Square.Order | undefined
  discounts: Discount[]
  addDiscount: (d: Discount) => void
  removeDiscount: (d: Discount["id"]) => void
  lineItems: Square.OrderLineItem[] | undefined
  calculating: boolean
}

export const OrderContext = createContext<OrderContextType | undefined>(
  undefined
)
