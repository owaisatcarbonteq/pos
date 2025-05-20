"use client"

import { FC } from "react"
import { useSearch } from "@/store/search.store"
import ProductCatalog, {
  IProductCatalogProps,
} from "@/components/composite/product/ProductCatalog"

const CatalogContainer: FC = () => {
  const tsQuery = useSearch() as unknown as IProductCatalogProps
  return <ProductCatalog {...tsQuery} />
}

export default CatalogContainer
