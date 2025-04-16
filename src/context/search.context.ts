import { createContext } from "react"

type SearchContextType = {
  query: string
  setQuery: (value: string) => void
}

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
)
