import { Product } from "@/types/square"
import QuantityControl from "../components/composite/quantity-controls/QuantityControls"
import { FC, memo } from "react"
import { useCartStore } from "@/store/cart.store"

export type IItemQuantityProps = {
  selected: string | null
  product: Product
}

const ItemQuantity: FC<IItemQuantityProps> = memo(
  ({ selected, product }) => {
    const { addToCart, removeFromCart, getQuantity } = useCartStore()
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
  (prev, next) => prev.selected === next.selected
)

ItemQuantity.displayName = "ItemQuantity"

export default ItemQuantity
