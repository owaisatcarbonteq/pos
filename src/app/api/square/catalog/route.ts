import config from "@/config"
import { serializeBigInts } from "@/utils/serializeBigInts.util"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import { Square, SquareClient, SquareEnvironment } from "square"

export const GET = async (req: NextRequest) => {
  const token = await getToken({ req, secret: config.nextauth.secret })

  const squareClient = new SquareClient({
    token: token?.accessToken,
    environment: SquareEnvironment.Sandbox,
  })

  const cursor = req.nextUrl.searchParams.get("cursor") ?? undefined
  const query = req.nextUrl.searchParams.get("query") ?? null

  const params: Square.SearchCatalogObjectsRequest = {
    objectTypes: ["ITEM"],
    cursor,
    limit: 10,
  }

  if (query) {
    params.query = { textQuery: { keywords: query.split(" ") } }
  }

  let items = await squareClient.catalog.search(params)

  const products = items.objects as Square.CatalogObject.Item[]

  const enrichedProducts = await Promise.all(
    products.map(async (obj) => {
      const imageIds = obj.itemData?.imageIds
      const variationImageIds = obj.itemData?.variations
        ?.map((v) => v.imageId)
        .filter((i) => i !== undefined)
      if (imageIds?.length) {
        const mainObjectImages = await squareClient.catalog.batchGet({
          objectIds: imageIds,
        })
        const images = (mainObjectImages.objects ??
          []) as Square.CatalogObject.Image[]
        let variationImageObjects = variationImageIds?.length
          ? await squareClient.catalog.batchGet({
              objectIds: variationImageIds,
            })
          : null
        const variationImages = (variationImageObjects?.objects ??
          []) as Square.CatalogObject.Image[]
        return {
          ...obj,
          itemData: {
            ...obj.itemData,
            images: images.map((i) => ({ id: i.id, url: i.imageData?.url })),
            variations: {
              ...obj.itemData?.variations,
              images: variationImages.map((i) => ({
                id: i.id,
                url: i.imageData?.url,
              })),
            },
          },
        }
      }
      return obj
    })
  )

  return NextResponse.json({
    items: serializeBigInts(enrichedProducts),
    cursor: items.cursor,
  })
}
