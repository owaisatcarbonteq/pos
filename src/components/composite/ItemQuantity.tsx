import { Product } from "@/types/square"
import { QuantityControl } from "./QuantityControls"
import { FC, memo } from "react"
import { useCart } from "@/hooks/cart.hook"

type IQuantityProps = {
  selected: string | null
  product: Product
}

export const ItemQuantity: FC<IQuantityProps> = memo(
  ({ selected, product }) => {
    const { addToCart, removeFromCart, getQuantity } = useCart()
    return (
      <QuantityControl
        upEnabled={!!selected}
        downEnabled={
          !!selected &&
          getQuantity({ productId: product.id, variationId: selected }) > 0
        }
        upHandler={(quantity: number) =>
          selected
            ? addToCart({ product, variationId: selected, quantity })
            : null
        }
        downHandler={(quantity: number) =>
          removeFromCart({
            productId: product.id,
            variationId: selected ?? "",
            quantity,
          })
        }
        quantity={getQuantity({
          productId: product.id,
          variationId: selected ?? "",
        })}
      />
    )
  },
  (prev, next) => prev.product.id !== next.product.id
)
