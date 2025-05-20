import { CheckoutContainer } from "@/containers/cart/checkoutButton.container"
import { Flex, List, Skeleton, theme, Typography } from "antd"
import { FC } from "react"
import { Square } from "square"

type IOrderTotalsProps = {
  order: Square.Order
  isCalculating: boolean
}

const OrderTotals: FC<IOrderTotalsProps> = ({ order, isCalculating }) => {
  const { token } = theme.useToken()

  const descriptionItems = [
    {
      title: "Discount",
      value: `${(
        parseInt(order?.netAmounts?.discountMoney?.amount?.toString() ?? "0") /
        100
      ).toLocaleString("en-US", { minimumFractionDigits: 2 })} ${
        order?.netAmounts?.discountMoney?.currency ?? "$"
      }`,
    },
    {
      title: "Tax",
      value: `${(
        parseInt(order?.netAmounts?.taxMoney?.amount?.toString() ?? "0") / 100
      ).toLocaleString("en-US", { minimumFractionDigits: 2 })} ${
        order?.netAmounts?.taxMoney?.currency ?? "$"
      }`,
    },
    {
      title: "Total",
      value: `${(
        parseInt(order?.netAmounts?.totalMoney?.amount?.toString() ?? "0") / 100
      ).toLocaleString("en-US", { minimumFractionDigits: 2 })} ${
        order?.netAmounts?.totalMoney?.currency ?? "$"
      }`,
    },
  ]

  return (
    <List
      size="small"
      style={{ width: "100%" }}
      footer={
        <Flex style={{ width: "100%" }}>
          <CheckoutContainer />
        </Flex>
      }
      bordered
      dataSource={descriptionItems}
      renderItem={(item, idx) => (
        <List.Item
          actions={[
            <Typography.Text
              key={idx}
              style={{
                color: token.colorPrimaryHover,
                fontFamily: token.fontFamilyCode,
              }}
            >
              {isCalculating ? (
                <Skeleton.Input active size="small" style={{ height: 22 }} />
              ) : (
                item.value
              )}
            </Typography.Text>,
          ]}
        >
          <Typography.Text>{item.title}</Typography.Text>
        </List.Item>
      )}
    />
  )
}

export default OrderTotals
