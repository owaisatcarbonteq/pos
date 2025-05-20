import { generateCheckoutLink } from "@/actions/square.action"
import CheckoutButton from "@/components/composite/cart/CheckoutButton"
import { useOrderStore } from "@/store/order.store"
import { redirect } from "next/navigation"
import { useState } from "react"

export const CheckoutContainer = () => {
  const { order, lineItems } = useOrderStore()
  const [loading, setLoading] = useState<boolean>(false)

  const handleCheckout = async () => {
    setLoading(true)
    const link = await generateCheckoutLink(lineItems!)
    if (link?.paymentLink?.url) redirect(link?.paymentLink?.url)
    setLoading(false)
  }
  return (
    <CheckoutButton
      isLoading={loading}
      isDisabled={!order}
      handleCheckout={handleCheckout}
    />
  )
}
