import CartProduct from "@/components/composite/product/CartProduct"
import { Flex, Typography } from "antd"
import { CartFooter } from "../../../containers/cart/cartFooter.container"
import { FC } from "react"
import { CartState } from "@/store/cart.store"
import { OrderState } from "@/store/order.store"

type IShoppingCartProps = Pick<CartState, "items"> &
  Pick<OrderState, "discounts" | "removeDiscount">
export const ShoppingCart: FC<IShoppingCartProps> = ({
  items,
  discounts,
  removeDiscount,
}) => {
  return (
    <Flex vertical justify="space-between" style={{ height: "100%", gap: 24 }}>
      <Flex
        vertical
        style={{
          overflowY: "auto",
          padding: 0,
          width: "100%",
          minWidth: "100%",
          margin: 0,
        }}
      >
        {items.map((i) => (
          <CartProduct
            product={i.product}
            key={i.variationId}
            variationId={i.variationId}
            quantity={i.quantity}
            discounts={discounts.filter((d) =>
              d.enabledFor?.includes(i.variationId)
            )}
            removeDiscount={removeDiscount}
          />
        ))}
      </Flex>

      {items.length > 0 ? (
        <CartFooter />
      ) : (
        <Typography.Text>No items in cart.</Typography.Text>
      )}
    </Flex>
  )
}
