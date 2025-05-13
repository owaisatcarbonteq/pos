"use client"

import { ProductCardMemo } from "@/components/composite/product/ProductCard"
import { useSearch } from "@/hooks/search.hook"
import { Product } from "@/types/square"
import { Button, Col, Flex, Row, Skeleton } from "antd"
import { FC } from "react"
import "../../styles/products.style.css"

const CatalogContainer: FC = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearch()
  return (
    <Flex
      className="products-container"
      style={{ width: "100%", padding: 4 }}
      vertical
      gap={18}
    >
      <Row
        className="products-row"
        gutter={[
          { xs: 10, sm: 12, md: 14 },
          { xs: 10, sm: 12, md: 14 },
        ]}
        justify="center"
      >
        {isLoading &&
          Array.from({ length: 12 }).map((_, i) => (
            <Col key={i}>
              <Skeleton.Image className="product-image" active />
              <Skeleton />
            </Col>
          ))}

        {data?.pages.map((page, pageIndex) =>
          page?.items.map((product: Product, productIndex: number) => (
            <Col key={`${product.id}-${pageIndex}-${productIndex}`}>
              <ProductCardMemo product={product} />
            </Col>
          ))
        )}
      </Row>
      {hasNextPage ? (
        <Button
          onClick={() => fetchNextPage()}
          loading={isFetchingNextPage}
          style={{ margin: "auto", marginBottom: 10 }}
        >
          More
        </Button>
      ) : (
        <hr className="products-footer" />
      )}
    </Flex>
  )
}

export default CatalogContainer
