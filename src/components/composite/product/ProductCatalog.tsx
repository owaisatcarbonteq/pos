import { Button, Col, Flex, Row, Skeleton } from "antd"
import ProductCard from "./ProductCard"
import { Product } from "@/types/square"
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query"
import { FC } from "react"

import "@/styles/products.style.css"

export type IProductCatalogProps = UseInfiniteQueryResult<
  InfiniteData<
    {
      items: Product[]
      cursor: string | undefined
    },
    unknown
  >,
  Error
>

const ProductCatalog: FC<IProductCatalogProps> = ({
  isLoading,
  data,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}) => {
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
          Array.from({ length: 10 }).map((_, i) => (
            <Col key={i}>
              <Skeleton.Image className="product-image" />
              <Skeleton />
            </Col>
          ))}

        {data?.pages.map((page, pageIndex) =>
          page?.items.map((product: Product, productIndex: number) => (
            <Col key={`${product.id}-${pageIndex}-${productIndex}`}>
              <ProductCard product={product} />
            </Col>
          ))
        )}
      </Row>
      {hasNextPage ? (
        <Button
          size="large"
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

ProductCatalog.displayName = "ProductCatalog"

export default ProductCatalog
