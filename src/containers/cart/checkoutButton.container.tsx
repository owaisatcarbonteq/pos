import { generateCheckoutLink } from "@/actions/square.action"
import { useOrder } from "@/hooks/order.hook"
import { Button, ButtonProps } from "antd"
import { redirect } from "next/navigation"
import { FC, useState } from "react"

type TCheckoutButtonProps = Omit<
  ButtonProps,
  "type" | "loading" | "onClick" | "disabled"
>
export const CheckoutButton: FC<TCheckoutButtonProps> = (props) => {
  const { order, lineItems } = useOrder()
  const [loading, setLoading] = useState<boolean>(false)

  const handleCheckout = async () => {
    setLoading(true)
    const link = await generateCheckoutLink(lineItems!)
    if (link?.paymentLink?.url) redirect(link?.paymentLink?.url)
    setLoading(false)
  }
  return (
    <Button
      loading={loading}
      onClick={handleCheckout}
      disabled={!order}
      type="dashed"
      {...props}
    >
      Checkout
    </Button>
  )
}
