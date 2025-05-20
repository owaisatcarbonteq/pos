import { test, expect } from "@playwright/test"
import {
  addVariantToCart,
  getCartCount,
  removeVariantFromCart,
} from "./helpers/product.helpers"
import { generateSessionToken } from "./helpers/generateSessionToken"

test.describe("Product card functionality", () => {
  test.beforeEach("authenticate", async ({ page }) => {
    await page.goto("/auth/login")

    await page.context().addCookies([
      {
        name: "next-auth.session-token",
        value: await generateSessionToken(),
        domain: "localhost",
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      },
    ])

    await page.goto("/home", {
      waitUntil: "domcontentloaded",
    })
  })

  test("selector works", async ({ page }) => {
    await page.waitForSelector(".ant-select")

    const productCard = page.locator(".ant-card").first()

    const variantSelector = productCard.locator(".ant-select").first()
    await variantSelector.click()

    const variantDropdown = page.locator(".ant-select-dropdown")
    await expect(variantDropdown).toBeVisible()
    const variantOptions = await page
      .locator(".ant-select-item-option-content")
      .all()

    for (const opt of variantOptions) {
      const optionText = await opt.innerText()
      await opt.click()

      const selectedVariant = await variantSelector
        .locator(".ant-select-selection-item")
        .first()
        .innerText()
      expect(selectedVariant).toContain(optionText)

      await variantSelector.click()
      await expect(page.locator(".ant-select-dropdown")).toBeVisible()
    }
  })
  test("add to cart works", async ({ page }) => {
    await page.waitForSelector(".anticon-plus")

    const productCard = page.locator(".ant-card").first()

    const itemCountBefore = await getCartCount(productCard)

    expect(itemCountBefore).toBe(0)

    await addVariantToCart(productCard, 1)

    const itemCountAfter = await getCartCount(productCard)

    expect(itemCountAfter).toBe(1)
  })
  test("spam add to cart works", async ({ page }) => {
    await page.waitForSelector(".anticon-plus")

    const productCard = page.locator(".ant-card").first()

    const itemCountBefore = await getCartCount(productCard)

    expect(itemCountBefore).toBe(0)

    await addVariantToCart(productCard, 5)

    const itemCountAfter = await getCartCount(productCard)

    expect(itemCountAfter).toBe(5)
  })
  test("remove from cart works", async ({ page }) => {
    await page.waitForSelector(".anticon-minus")

    const productCard = page.locator(".ant-card").first()

    const itemCountBefore = await getCartCount(productCard)

    expect(itemCountBefore).toBe(0)

    await addVariantToCart(productCard, 1)

    const itemCountAfter = await getCartCount(productCard)

    expect(itemCountAfter).toBe(1)

    await removeVariantFromCart(productCard, 1)

    const itemCountAfterRemoved = await getCartCount(productCard)

    expect(itemCountAfterRemoved).toBe(0)
  })
  test("remove from empty cart does nothing", async ({ page }) => {
    await page.waitForSelector(".anticon-minus")

    const productCard = page.locator(".ant-card").first()

    const itemCountBefore = await getCartCount(productCard)

    expect(itemCountBefore).toBe(0)

    await removeVariantFromCart(productCard, 1)

    const itemCountAfterRemoved = await getCartCount(productCard)

    expect(itemCountAfterRemoved).toBe(0)
  })
  test("spam remove from cart works", async ({ page }) => {
    await page.waitForSelector(".anticon-minus")

    const productCard = page.locator(".ant-card").first()

    const itemCountBefore = await getCartCount(productCard)

    expect(itemCountBefore).toBe(0)

    await addVariantToCart(productCard, 5)

    const itemCountAfter = await getCartCount(productCard)

    expect(itemCountAfter).toBe(5)

    await removeVariantFromCart(productCard, 5)

    const itemCountAfterRemoved = await getCartCount(productCard)

    expect(itemCountAfterRemoved).toBe(0)
  })
})
