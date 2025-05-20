"use client"

import { CartItem, Discount } from "@/types/square"
import { Flex, Grid, Tag, theme, Typography } from "antd"
import { FC, memo } from "react"
import { ImageSuspense } from "../../base/ImageSuspense"
import ItemQuantity from "../../../containers/itemQuantity.container"
import { OrderState } from "@/store/order.store"
import { areArraysEqual } from "@/utils/areArraysEqual.util"

const { useBreakpoint } = Grid

type ICartProductProps = CartItem &
  Pick<OrderState, "discounts" | "removeDiscount">

const CartProduct: FC<ICartProductProps> = memo(
  ({ product, variationId, quantity, discounts, removeDiscount }) => {
    const { token } = theme.useToken()
    const currVariation =
      product.itemData.variations?.find((v) => v.id === variationId) ?? null
    const imageUrl =
      product.itemData.variationImages?.find(
        (img) => img.id === currVariation?.id
      )?.url ?? `https://picsum.photos/${Math.floor(200 + 100 * Math.random())}`
    const screens = useBreakpoint()
    const isMobile = !screens.md
    const handleRemoveDiscount = (discountId: Discount["id"]) => {
      removeDiscount(discountId, variationId)
    }
    return (
      <Flex
        style={{
          width: "full",
          display: "flex",
          marginBottom: 12,
          backgroundColor: token.colorBgContainer,
          borderRadius: 8,
          padding: 8,
        }}
      >
        <ImageSuspense
          className="cart-image"
          alt={product.itemData.name ?? "product"}
          src={imageUrl}
          style={{
            margin: 0,
            borderRadius: 8,
          }}
        />
        <Flex
          justify="space-between"
          align="center"
          style={{ width: "100%", height: "100%", margin: "auto" }}
        >
          <Flex
            vertical
            style={{ paddingLeft: isMobile ? 8 : 8, height: "100%" }}
            justify="space-between"
          >
            <Flex vertical justify="space-evenly">
              {isMobile ? (
                <>
                  <Typography.Text style={{ fontSize: 16 }}>
                    {product.itemData.name}
                  </Typography.Text>
                  <Typography.Text style={{ fontSize: 14, opacity: 0.6 }}>
                    {currVariation?.itemVariationData?.name}
                  </Typography.Text>
                </>
              ) : (
                <>
                  <Typography.Text style={{ fontSize: 18 }}>
                    {product.itemData.name}
                  </Typography.Text>
                  <Typography.Text style={{ fontSize: 16, opacity: 0.6 }}>
                    {currVariation?.itemVariationData?.name}
                  </Typography.Text>
                </>
              )}
            </Flex>
            {discounts.length > 0 && (
              <Flex
                wrap
                style={{
                  alignItems: "flex-start",
                  overflowY: "auto",
                }}
              >
                {discounts.map((d) => (
                  <Tag
                    key={d.id}
                    closeIcon
                    onClose={() => handleRemoveDiscount(d.id)}
                    style={{
                      margin: 2,
                      display: "block",
                      borderColor: d.percentage
                        ? token.colorSuccess
                        : token.colorPrimaryHover,
                    }}
                  >
                    {d.name?.split(" ")[0]}{" "}
                    <Typography.Text
                      style={{
                        fontSize: 12,
                        color: d.percentage
                          ? token.colorSuccess
                          : token.colorPrimaryHover,
                      }}
                    >
                      {d.percentage
                        ? `${Number(d.percentage)}%`
                        : `${(
                            Number(d.amountMoney?.amount) / 100
                          ).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })} USD`}
                    </Typography.Text>
                  </Tag>
                ))}
              </Flex>
            )}
          </Flex>
          <Flex
            vertical
            style={{
              alignItems: "center",
              justifyContent: "start",
              height: "100%",
            }}
            gap={8}
          >
            <ItemQuantity product={product} selected={variationId} />
            <Typography.Text
              style={{
                fontSize: isMobile ? 14 : 16,
                color: token.colorPrimaryHover,
                fontFamily: token.fontFamilyCode,
              }}
            >
              {currVariation?.itemVariationData?.pricingType ===
              "VARIABLE_PRICING"
                ? "0 USD"
                : `${(
                    ((parseInt(
                      currVariation?.itemVariationData?.priceMoney?.amount?.toString() ??
                        "0"
                    ) ?? 0) *
                      quantity) /
                    100
                  ).toLocaleString("en-US", { minimumFractionDigits: 2 })} ${
                    currVariation?.itemVariationData?.priceMoney?.currency ??
                    "$"
                  }`}
            </Typography.Text>
          </Flex>
        </Flex>
      </Flex>
    )
  },
  (prevProps, nextProps) =>
    prevProps.product.id === nextProps.product.id &&
    prevProps.variationId === nextProps.variationId &&
    prevProps.quantity === nextProps.quantity &&
    areArraysEqual(
      prevProps.discounts.map((d) => d.enabledFor).flat(),
      nextProps.discounts.map((d) => d.enabledFor).flat()
    )
)

CartProduct.displayName = "CartProduct"

export default CartProduct
