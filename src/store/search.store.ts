import { fetchCatalogPaginated } from "@/actions/square.action"
import { useInfiniteQuery } from "@tanstack/react-query"
import { create } from "zustand"

type SearchState = {
  query: string
  setQuery: (value: string) => void
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  setQuery: (query) => set({ query: query ?? "" }),
}))

export const useSearch = () => {
  const { query, setQuery } = useSearchStore()

  const tsQuery = useInfiniteQuery({
    queryKey: ["items", (query.length > 1 && query) ?? ""],
    queryFn: fetchCatalogPaginated,
    getNextPageParam: (lastPage) => lastPage?.cursor ?? undefined,
    initialPageParam: null,
    staleTime: 1000 * 60 * 5,
  })

  return {
    ...tsQuery,
    query,
    setQuery,
  }
}
