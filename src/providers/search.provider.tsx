"use client"

import { fetchCatalogPaginated } from "@/actions/square.action"
import { SearchContext } from "@/context/search.context"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useState } from "react"

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState<string>()
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["items", query],
      queryFn: fetchCatalogPaginated,
      getNextPageParam: (lastPage) => lastPage?.cursor ?? undefined,
      initialPageParam: null,
      staleTime: 1000 * 60 * 5,
    })
  return (
    <SearchContext.Provider
      value={{
        query: query ?? "",
        setQuery,
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
