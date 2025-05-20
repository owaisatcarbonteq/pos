import { Discount } from "@/types/square"
import { areArraysEqual } from "@/utils/areArraysEqual.util"
import { Flex, Select, Tag, theme, Typography } from "antd"
import { FC } from "react"
import { Square } from "square"

type ISelectDiscountProps = {
  isLoading: boolean
  handleSelect: (discountId: Discount["id"]) => void
  handleDeselect: (discountId: Discount["id"]) => void
  fetchedDiscounts: Discount[]
  discounts: Discount[]
  lineItems: Square.OrderLineItem[]
}

const SelectDiscounts: FC<ISelectDiscountProps> = ({
  isLoading,
  handleSelect,
  handleDeselect,
  fetchedDiscounts,
  discounts,
  lineItems,
}) => {
  const { token } = theme.useToken()

  return (
    <Select
      placement="topLeft"
      loading={isLoading}
      onSelect={handleSelect}
      onDeselect={handleDeselect}
      value={discounts
        .filter((d) =>
          areArraysEqual(
            d.enabledFor ?? [],
            d.appliedTo ?? lineItems.map((li) => li.uid)
          )
        )
        .map((d) => d.id)}
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
          percentage: d.percentage,
          amountMoney: d.amountMoney,
          appliedTo: d.appliedTo,
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
  )
}

export default SelectDiscounts
