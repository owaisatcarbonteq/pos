import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query"
import { createContext } from "react"

type SearchContextType = {
  query: string
  setQuery: (value: string) => void
} & Pick<
  UseInfiniteQueryResult<
    InfiniteData<
      | {
          items: any
          cursor: string | undefined
        }
      | undefined,
      unknown
    >,
    Error
  >,
  "data" | "isLoading" | "fetchNextPage" | "hasNextPage" | "isFetchingNextPage"
>

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
)
