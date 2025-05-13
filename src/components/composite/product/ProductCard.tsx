"use client"

import { CatalogItem, Product } from "@/types/square"
import { Card, Select } from "antd"
import { FC, memo, useState } from "react"
import { ImageSuspense } from "../../base/ImageSuspense"
import { ItemQuantity } from "../ItemQuantity"
import "../../../styles/productCard.style.css"

const { Meta } = Card

type ProductProps = {
  product: Product
}

export const ProductCard: FC<ProductProps> = ({ product }) => {
  const [selected, setSelected] = useState<string | null>(null)

  const actions: React.ReactNode[] = [
    <ItemQuantity product={product} selected={selected} />,
  ]

  const imageUrl = selected
    ? (product.itemData as CatalogItem["itemData"])?.["variationImages"]?.find(
        (v) => v.id === selected
      )?.url ?? `https://picsum.photos/${Math.floor(200 + 100 * Math.random())}`
    : product.itemData?.images?.[0].url ??
      `https://picsum.photos/${Math.floor(200 + 100 * Math.random())}`
  return (
    <Card
      hoverable
      cover={
        <ImageSuspense
          className="product-image"
          alt={product.itemData.name ?? "product-image"}
          src={imageUrl}
          preview={false}
          style={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
      }
      actions={actions}
    >
      <Meta
        title={
          <div
            className="product-name"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product.itemData.name}
          </div>
        }
        description={
          <Select
            className="product-select"
            style={{
              minWidth: "100%",
            }}
            placeholder="Variants"
            options={product.itemData.variations?.map((v, i) => ({
              value: v.id,
              //@ts-expect-error
              label: v.itemVariationData.name,
            }))}
            onChange={(value: string) => setSelected(value)}
          />
        }
      />
    </Card>
  )
}

export const ProductCardMemo = memo(ProductCard)
