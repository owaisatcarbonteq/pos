import { QueryFunctionContext } from "@tanstack/react-query"
class SquareService {
  static fetchProducts = async ({
    pageParam = null,
    queryKey = ["", ""],
  }: QueryFunctionContext) => {
    const [_key, searchQuery] = queryKey
    const cursorQuery = pageParam ? `&cursor=${pageParam}` : ""
    const queryParam = searchQuery
      ? `&query=${encodeURIComponent(searchQuery as string)}`
      : ""

    const res = await fetch(`/api/square/catalog?${cursorQuery}${queryParam}`)

    if (!res.ok) throw new Error("Failed to fetch products")
    return await res.json()
  }
}

export default SquareService
