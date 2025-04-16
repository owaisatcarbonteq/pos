"use client"

import { ProductCard } from "@/components/composite/ProductCard"
import { useSearch } from "@/hooks/search.hook"
import SquareService from "@/services/square.service"
import { Product } from "@/types/square"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Button, Flex, Skeleton, Space } from "antd"
import { FC } from "react"

const ProductContainer: FC = () => {
  const { query } = useSearch()
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["items", query],
    queryFn: SquareService.fetchProducts,
    getNextPageParam: (lastPage) => lastPage.cursor ?? undefined,
    initialPageParam: null,
    staleTime: 1000 * 60 * 5,
  })
  console.log(data)
  return (
    <Flex style={{ width: "100%" }} vertical>
      <Flex wrap gap={16} style={{ width: "68.6%", margin: "auto" }}>
        {isLoading &&
          Array.from({ length: 10 }).map((_, i) => (
            <Flex vertical key={i}>
              <Skeleton.Image active style={{ width: 250, height: 250 }} />
              <Skeleton style={{ width: 250 }} />
            </Flex>
          ))}
        {data?.pages.map((page, pageIndex) =>
          page.items.map((product: Product, productIndex: number) => (
            <ProductCard
              key={`${product.id}-${pageIndex}-${productIndex}`}
              product={product}
            />
          ))
        )}
        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            loading={isFetchingNextPage}
            style={{ margin: "auto" }}
          >
            More
          </Button>
        )}
      </Flex>
    </Flex>
  )
}

export default ProductContainer
