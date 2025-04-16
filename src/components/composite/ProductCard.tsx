"use client"

import { Product } from "@/types/square"
import { EyeOutlined, EllipsisOutlined, PlusOutlined } from "@ant-design/icons"
import { Card } from "antd"
import { FC } from "react"
import { ImageSuspense } from "../base/ImageSuspense"
import { useCart } from "@/hooks/cart.hook"

const { Meta } = Card

type ProductProps = {
  product: Product
}

export const ProductCard: FC<ProductProps> = ({ product }) => {
  const { addToCart } = useCart()
  const actions: React.ReactNode[] = [
    <EyeOutlined key="edit" />,
    <PlusOutlined key="setting" onClick={() => addToCart(product)} />,
    <EllipsisOutlined key="ellipsis" />,
  ]
  const imageUrl =
    product.itemData?.images?.[0].url ??
    `https://picsum.photos/${Math.floor(200 + 100 * Math.random())}`
  return (
    <Card
      hoverable
      cover={
        <ImageSuspense
          width={250}
          height={250}
          alt={product.itemData.name ?? "product"}
          src={imageUrl}
          preview={false}
          style={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            flex: "0 0 calc(25% - 12px)",
          }}
        />
      }
      actions={actions}
    >
      <Meta
        title={
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: 200,
            }}
          >
            {product.itemData.name}
          </div>
        }
        description={product.itemData.name}
      />
    </Card>
  )
}
