import {
  Grid,
  Flex,
  List,
  Select,
  Skeleton,
  Tag,
  theme,
  Typography,
} from "antd"
import { CheckoutButton } from "./checkoutButton.container"
import { useQuery } from "@tanstack/react-query"
import { fetchDiscounts } from "@/actions/square.action"
import { Discount } from "@/types/square"
import { useOrder } from "@/hooks/order.hook"

const { useBreakpoint } = Grid

export const CartFooter = () => {
  const { order, lineItems, addDiscount, removeDiscount, calculating } =
    useOrder()
  const { token } = theme.useToken()

  const screens = useBreakpoint()
  const isMobile = !screens.md

  const { data: fetchedDiscounts, isLoading } = useQuery({
    queryKey: [],
    queryFn: fetchDiscounts,
  })

  const handleSelect = (value: Discount["id"]) => {
    addDiscount(fetchedDiscounts?.find((d) => d.id === value)!)
  }

  const handleDeselect = async (value: Discount["id"]) => {
    removeDiscount(value)
  }

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
    <Flex vertical gap={5}>
      <Select
        placement="topLeft"
        loading={isLoading}
        onSelect={handleSelect}
        onDeselect={handleDeselect}
        mode="tags"
        placeholder="Click to apply discounts.."
        options={fetchedDiscounts
          ?.filter((d) =>
            d.appliedTo
              ? lineItems
                  ?.map((i) => i.uid)
                  .some((v) => d.appliedTo?.includes(v ?? ""))
              : true
          )
          .map((d) => ({
            value: d.id,
            label: d.name,
            ...d,
          }))}
        menuItemSelectedIcon={false}
        optionRender={(opt) => (
          <Flex justify="space-between">
            {opt.label}
            <Flex style={{ width: "50%" }} justify="end" gap={8}>
              <Typography.Text
                className="discount-option"
                style={{
                  color: token.colorPrimaryHover,
                  fontFamily: token.fontFamilyCode,
                }}
              >
                {"Save " +
                  (opt.data.percentage
                    ? `${Number(opt.data.percentage)}%`
                    : `${(
                        Number(opt.data.amountMoney?.amount) / 100
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })} USD`) +
                  `${opt.data.appliedTo ? " on" : ""}`}
              </Typography.Text>
              {opt.data.appliedTo
                ? lineItems
                    ?.filter((i) => opt.data.appliedTo?.includes(i.uid ?? ""))
                    .map((i) => (
                      <Tag key={i.uid}>
                        {i.name ?? ""}
                        {" ["}
                        {i.variationName ?? ""}
                        {"]"}
                      </Tag>
                    ))
                : null}
            </Flex>
          </Flex>
        )}
      />
      <List
        size="small"
        style={{ width: "100%" }}
        footer={
          <Flex style={{ width: "100%" }}>
            <CheckoutButton
              style={{
                width: "30%",
                padding: isMobile ? 16 : 24,
                marginLeft: "auto",
              }}
            />
          </Flex>
        }
        bordered
        dataSource={descriptionItems}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Typography.Text
                style={{
                  color: token.colorPrimaryHover,
                  fontFamily: token.fontFamilyCode,
                }}
              >
                {calculating ? (
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
    </Flex>
  )
}
