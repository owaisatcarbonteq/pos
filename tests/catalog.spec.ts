import { test, expect } from "@playwright/test"
import { mockAuthentication } from "./helpers"

test.describe("Catalog page", () => {
  test.beforeEach("authenticate", async ({ page }) => {
    await mockAuthentication(page)

    await page.goto("/home", {
      waitUntil: "domcontentloaded",
    })
  })

  test.describe("product rendering", () => {
    test("all products are rendered", async ({ page }) => {
      await page.waitForSelector(".ant-card")

      const productCards = await page.locator(".ant-card").all()
      expect(productCards.length).toBe(10)
    })
    test("infinite scroll works", async ({ page }) => {
      await page.waitForSelector(".ant-card")

      const productCards = await page.locator(".ant-card").all()
      expect(productCards.length).toBe(10)

      await page.getByRole("button", { name: "More" }).click()
      await expect
        .poll(
          async () => {
            return await page.locator(".ant-card").count()
          },
          {
            message: "Expected 20 product cards after first load",
          }
        )
        .toBe(20)

      await page.getByRole("button", { name: "More" }).click()
      await expect
        .poll(
          async () => {
            return await page.locator(".ant-card").count()
          },
          {
            message: "Expected 30 product cards after first load",
          }
        )
        .toBe(30)
    })
  })
})
