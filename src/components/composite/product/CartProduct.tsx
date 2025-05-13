"use client"

import { CartItem } from "@/types/square"
import { Flex, Grid, theme, Typography } from "antd"
import { FC, memo } from "react"
import { ImageSuspense } from "../../base/ImageSuspense"
import { ItemQuantity } from "../ItemQuantity"

const { useBreakpoint } = Grid

export const CartProduct: FC<CartItem> = memo(
  ({ product, variationId, quantity }) => {
    const { token } = theme.useToken()
    const currVariation = product.itemData.variations?.find(
      (v) => v.id === variationId
    )!
    const imageUrl =
      product.itemData.variationImages?.find(
        (img) => img.id === currVariation.id
      )?.url ?? `https://picsum.photos/${Math.floor(200 + 100 * Math.random())}`
    const screens = useBreakpoint()
    const isMobile = !screens.md
    return (
      <Flex
        style={{
          width: "full",
          display: "flex",
          flexDirection: "row",
          marginBottom: 12,
          backgroundColor: token.colorBgContainer,
          borderRadius: 4,
        }}
      >
        <ImageSuspense
          className="cart-image"
          preview={false}
          alt={product.itemData.name ?? "product"}
          src={imageUrl}
          style={{
            margin: 0,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
          }}
        />
        <Flex
          justify="space-between"
          align="center"
          style={{ width: "100%", height: "100%", margin: "auto" }}
        >
          <Flex vertical justify="space-evenly">
            {isMobile ? (
              <>
                <Typography.Text style={{ fontSize: 16, paddingLeft: 10 }}>
                  {product.itemData.name}
                </Typography.Text>
                <Typography.Text
                  style={{ fontSize: 14, paddingLeft: 10, opacity: 0.6 }}
                >
                  {currVariation.itemVariationData?.name}
                </Typography.Text>
              </>
            ) : (
              <>
                <Typography.Text style={{ fontSize: 18, paddingLeft: 20 }}>
                  {product.itemData.name}
                </Typography.Text>
                <Typography.Text
                  style={{ fontSize: 16, paddingLeft: 20, opacity: 0.6 }}
                >
                  {currVariation.itemVariationData?.name}
                </Typography.Text>
              </>
            )}
          </Flex>
          <Flex
            justify="space-between"
            align="center"
            {...(isMobile
              ? {
                  vertical: true,
                  style: {
                    width: "35%",
                    padding: 6,
                    paddingBottom: 0,
                    alignItems: "end",
                  },
                }
              : { vertical: false, style: { width: "55%" } })}
          >
            <ItemQuantity product={product} selected={variationId} />
            <Typography.Text
              style={{
                fontSize: isMobile ? 14 : 16,
                padding: `${isMobile ? 10 : 20}px ${isMobile ? 10 : 20}px ${
                  isMobile ? 10 : 20
                }px 0`,
                color: token.colorPrimaryHover,
                fontFamily: token.fontFamilyCode,
              }}
            >
              {currVariation.itemVariationData?.pricingType ===
              "VARIABLE_PRICING"
                ? "0 USD"
                : `${(
                    ((parseInt(
                      currVariation.itemVariationData?.priceMoney?.amount?.toString() ??
                        "0"
                    ) ?? 0) *
                      quantity) /
                    100
                  ).toLocaleString("en-US", { minimumFractionDigits: 2 })} ${
                    currVariation.itemVariationData?.priceMoney?.currency ?? "$"
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
    prevProps.quantity === nextProps.quantity
)
