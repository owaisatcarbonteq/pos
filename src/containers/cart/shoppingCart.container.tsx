import { ShoppingCart } from "@/components/composite/cart/ShoppingCart"
import { useCartStore } from "@/store/cart.store"
import { useOrderStore } from "@/store/order.store"

const ShoppingCartContainer = () => {
  const { items } = useCartStore()
  const { discounts, removeDiscount } = useOrderStore()
  return (
    <ShoppingCart
      items={items}
      discounts={discounts}
      removeDiscount={removeDiscount}
    />
  )
}

export default ShoppingCartContainer
