import { CartState } from "@/store/cart.store"

export type ItemQuantityControllers = Pick<
  CartState,
  "addToCart" | "removeFromCart" | "getQuantity"
>
