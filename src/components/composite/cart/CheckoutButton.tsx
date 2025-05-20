import { SecurityScanOutlined } from "@ant-design/icons"
import { Grid, Button, ButtonProps } from "antd"
import { FC } from "react"

const { useBreakpoint } = Grid

type ICheckoutButtonProps = {
  isLoading: boolean
  isDisabled: boolean
  handleCheckout: () => Promise<void>
} & Omit<ButtonProps, "type" | "loading" | "onClick" | "disabled">

const CheckoutButton: FC<ICheckoutButtonProps> = ({
  isLoading,
  handleCheckout,
  isDisabled,
  ...rest
}) => {
  const screens = useBreakpoint()
  const isMobile = !screens.md
  return (
    <Button
      loading={isLoading}
      onClick={handleCheckout}
      disabled={isDisabled}
      type="dashed"
      icon={<SecurityScanOutlined />}
      style={{
        padding: isMobile ? 16 : 24,
        marginLeft: "auto",
      }}
      {...rest}
    >
      Checkout
    </Button>
  )
}

export default CheckoutButton
