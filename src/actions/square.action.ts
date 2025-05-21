"use server"

import { createSquareClient } from "@/lib/square/client.square"
import { CatalogItem, Discount } from "@/types/square"
import { serializeBigInts } from "@/utils/serializeBigInts.util"
import { QueryFunctionContext } from "@tanstack/react-query"
import { Square } from "square"
import { testProducts } from "../../tests/data/products"

export const fetchCatalogPaginated = async ({
  pageParam = null,
  queryKey = ["", ""],
}: QueryFunctionContext) => {
  if (process.env.APP_ENV === "test") {
    return testProducts
  }

  const squareClient = await createSquareClient()

  const [, query] = queryKey as [string, string]
  const cursor = (pageParam as string) ?? undefined
  const params: Square.SearchCatalogObjectsRequest = {
    objectTypes: [Square.CatalogObjectType.Item],
    cursor,
    limit: 10,
  }

  if (query) {
    if (query.length >= 2) {
      const keywords = query.split(" ").filter((k) => k.length > 1)
      if (keywords.length > 0) params.query = { textQuery: { keywords } }
    }
  }

  const items = await squareClient?.catalog.search(params)

  const products = items?.objects as CatalogItem[]

  const enrichedProducts = await Promise.all(
    products?.map(async (obj) => {
      const imageIds = obj.itemData?.imageIds
      const variationImageIds = obj.itemData?.variations
        ?.map((v) => ({
          id: obj.id,
          variationId: v.id,
          imageIds: v.itemVariationData?.imageIds,
        }))
        .filter((i) => i.imageIds !== undefined && i.imageIds !== null)
      if (imageIds?.length) {
        const mainObjectImages = await squareClient?.catalog.batchGet({
          objectIds: imageIds,
        })
        const images = (mainObjectImages?.objects ??
          []) as Square.CatalogObject.Image[]
        const variationImageObjects = variationImageIds?.length
          ? await squareClient?.catalog.batchGet({
              objectIds: variationImageIds.map((v) => v.imageIds!).flat(),
            })
          : null
        const variationImages = (variationImageObjects?.objects ??
          []) as Square.CatalogObject.Image[]
        return {
          ...obj,
          itemData: {
            ...obj.itemData,
            images: images.map((i) => ({ id: i.id, url: i.imageData?.url })),
            variationImages: variationImages.map((i) => ({
              id: variationImageIds?.find((v) => v.imageIds?.includes(i.id))
                ?.variationId,
              url: i.imageData?.url,
            })),
          },
        }
      }
      return obj
    }) ?? []
  )

  return {
    items: serializeBigInts(enrichedProducts),
    cursor: items?.cursor,
  }
}

export const calculateOrder = async (
  lineItems: Square.OrderLineItem[] | undefined,
  discounts?: Discount[]
): Promise<Square.Order> => {
  const squareClient = await createSquareClient()

  const taxesRes = await squareClient?.catalog.search({
    objectTypes: [Square.CatalogObjectType.Tax],
  })

  const taxes = (taxesRes?.objects as Square.CatalogObjectTax[])?.map((o) => ({
    id: o.id,
    ...o.taxData,
  }))

  const calculated = await squareClient?.orders.calculate({
    order: {
      locationId: "L74NSFTW5NW26",
      lineItems: lineItems?.map((i) => ({
        ...i,
        appliedDiscounts:
          discounts
            ?.filter((d) => d.enabledFor?.includes(i.uid ?? ""))
            .map((d) => ({
              discountUid: d.id,
              appliedMoney: d.amountMoney ?? {
                amount: BigInt(
                  Math.round(
                    Number(
                      (Number(d.percentage) / 100) *
                        Number(i.basePriceMoney?.amount)
                    )
                  )
                ),
                currency: i.basePriceMoney?.currency,
              },
            })) ?? [],
      })),
      discounts: discounts?.map((d) => ({
        uid: d.id,
        name: d.name,
        amountMoney: d.amountMoney && {
          ...d.amountMoney,
          amount:
            BigInt(
              Number(d.amountMoney?.amount) *
                Number(
                  d.enabledFor
                    ?.map(
                      (id) => lineItems?.find(({ uid }) => uid === id)?.quantity
                    )
                    .reduce(
                      (total, quantity) => total + (Number(quantity) || 1),
                      0
                    )
                )
            ) ?? 0,
        },
        percentage: d.percentage,
        scope: d.enabledFor ? "LINE_ITEM" : "ORDER",
      })),
      taxes: taxes.map((t) => ({
        type: t.inclusionType,
        scope: "ORDER",
        ...t,
      })),
    },
  })

  return calculated?.order ?? ({} as Square.Order)
}

export const fetchDiscounts = async () => {
  const squareClient = await createSquareClient()

  const discountsRes = await squareClient?.catalog.search({
    objectTypes: [Square.CatalogObjectType.Discount],
  })

  const discounts = (
    discountsRes?.objects as Square.CatalogObjectDiscount[]
  ).map((o) => ({ id: o.id, ...o.discountData }))

  const pricingRulesRes = await squareClient?.catalog.search({
    objectTypes: [Square.CatalogObjectType.PricingRule],
  })

  const pricingRules = (
    pricingRulesRes?.objects as Square.CatalogObjectPricingRule[]
  ).map((o) => o.pricingRuleData)
  const discountsWithRules = pricingRules
    .map((p) => p?.discountId)
    .filter((d) => d !== undefined && d !== null)

  const finalDiscounts: Discount[] = discounts.filter(
    (d) => !discountsWithRules.includes(d.id)
  )

  if ((pricingRules?.length ?? 0) > 0) {
    const productSetsRes = await squareClient?.catalog.search({
      objectTypes: [Square.CatalogObjectType.ProductSet],
    })

    const productSets = (
      productSetsRes?.objects as Square.CatalogObjectProductSet[]
    ).map((s) => ({ id: s.id, productSetData: s.productSetData }))

    pricingRules.forEach((r) => {
      const discount = discounts.find((d) => d.id === r?.discountId)
      const appliedTo = productSets.find((s) => s.id === r?.matchProductsId)
        ?.productSetData?.productIdsAny

      if (discount && appliedTo) {
        finalDiscounts.push({ ...discount, appliedTo })
      }
    })
  }

  return finalDiscounts
}

export const fetchTaxes = async () => {
  const squareClient = await createSquareClient()

  const taxes = await squareClient?.catalog.search({
    objectTypes: [Square.CatalogObjectType.Tax],
  })

  return taxes?.objects
}

export const generateCheckoutLink = async (
  lineItems: Square.OrderLineItem[]
) => {
  const squareClient = await createSquareClient()

  const generated = await squareClient?.checkout.paymentLinks.create({
    order: {
      locationId: "L74NSFTW5NW26",
      lineItems,
    },
    paymentNote: "JZK",
  })

  return generated
}
