import { Flex } from "antd"
import { useQuery } from "@tanstack/react-query"
import { fetchDiscounts } from "@/actions/square.action"
import { Discount } from "@/types/square"
import { useOrder } from "@/store/order.store"
import SelectDiscounts from "@/components/composite/cart/footer/SelectDiscounts"
import OrderTotals from "@/components/composite/cart/footer/OrderTotals"

export const CartFooter = () => {
  const {
    order,
    discounts,
    lineItems,
    addDiscount,
    removeDiscount,
    calculating,
  } = useOrder()

  const { data: fetchedDiscounts, isLoading } = useQuery({
    queryKey: [],
    queryFn: fetchDiscounts,
  })

  const handleSelect = (value: Discount["id"]) => {
    console.log(value)
    let selectedDiscount =
      fetchedDiscounts?.find((d) => d.id === value) ?? ({} as Discount)
    if (!selectedDiscount.appliedTo) {
      selectedDiscount.enabledFor = lineItems?.map((li) => li.uid as string)
    } else {
      selectedDiscount = {
        ...selectedDiscount,
        enabledFor: selectedDiscount.appliedTo,
      }
    }
    addDiscount(selectedDiscount)
  }

  const handleDeselect = async (value: Discount["id"]) => {
    const deselectedDiscount =
      fetchedDiscounts?.find((d) => d.id === value) ?? ({} as Discount)
    deselectedDiscount.enabledFor = undefined
    removeDiscount(value)
  }

  return (
    <Flex vertical gap={5}>
      <SelectDiscounts
        isLoading={isLoading}
        handleSelect={handleSelect}
        handleDeselect={handleDeselect}
        fetchedDiscounts={fetchedDiscounts ?? []}
        discounts={discounts ?? []}
        lineItems={lineItems ?? []}
      />
      <OrderTotals order={order!} isCalculating={calculating} />
    </Flex>
  )
}
