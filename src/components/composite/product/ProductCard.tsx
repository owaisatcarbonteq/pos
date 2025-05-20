"use client"

import { CatalogItem, Product } from "@/types/square"
import { Card, Select } from "antd"
import { FC, memo, useState } from "react"
import { ImageSuspense } from "../../base/ImageSuspense"
import ItemQuantity from "../../../containers/itemQuantity.container"
import "../../../styles/productCard.style.css"

const { Meta } = Card

type IProductProps = {
  product: Product
}

const ProductCard: FC<IProductProps> = memo(
  ({ product }) => {
    const [selected, setSelected] = useState<string | null>(null)

    const actions: React.ReactNode[] = [
      <div
        key={product.id}
        style={{
          margin: 4,
        }}
      >
        <ItemQuantity product={product} selected={selected} />
      </div>,
    ]

    const imageUrl = selected
      ? (product.itemData as CatalogItem["itemData"])?.[
          "variationImages"
        ]?.find((v) => v.id === selected)?.url ??
        `https://picsum.photos/${Math.floor(200 + 100 * Math.random())}`
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
              options={product.itemData.variations?.map((v) => ({
                value: v.id,
                label: v.itemVariationData?.name,
              }))}
              onChange={(value: string) => setSelected(value)}
            />
          }
        />
      </Card>
    )
  },
  (prev, next) => prev.product.id === next.product.id
)

ProductCard.displayName = "ProductCard"

export default ProductCard
