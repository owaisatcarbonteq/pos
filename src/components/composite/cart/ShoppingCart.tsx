import { CartProduct } from "@/components/composite/product/CartProduct"
import { useCart } from "@/hooks/cart.hook"
import { Flex, Typography } from "antd"
import { CartFooter } from "../../../containers/cart/cartFooter.container"

export const ShoppingCart = () => {
  const { items } = useCart()

  return (
    <Flex vertical justify="space-between" style={{ height: "100%", gap: 24 }}>
      <Flex
        vertical
        style={{
          overflowY: "scroll",
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
