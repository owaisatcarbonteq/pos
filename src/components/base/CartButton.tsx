import { ShoppingCartOutlined } from "@ant-design/icons"
import { Badge, Button, theme } from "antd"
import { FC, MouseEventHandler } from "react"

type ICartButtonProps = {
  onClick: MouseEventHandler<HTMLElement>
  itemCount: number
}

const CartButton: FC<ICartButtonProps> = ({ onClick, itemCount }) => {
  const { token } = theme.useToken()
  return (
    <Button
      type="link"
      onClick={onClick}
      icon={
        <Badge count={itemCount} color={token.colorError}>
          <ShoppingCartOutlined
            className="cart-icon"
            style={{ fontSize: 30 }}
          />
        </Badge>
      }
    />
  )
}

export default CartButton
