import { test, expect } from "@playwright/test"
import { mockAuthentication } from "./helpers"

test.describe("Login flow", () => {
  test.describe("Redirect to Login if not authenticated", () => {
    test("unauthenticated", async ({ page }) => {
      const response = await page.goto("/home", {
        waitUntil: "domcontentloaded",
      })

      expect(response?.status()).toBe(200)

      expect(page.url()).toContain("/auth/login")
    })
    test("authenticated", async ({ page }) => {
      await mockAuthentication(page)

      const response = await page.goto("/home", {
        waitUntil: "domcontentloaded",
      })

      expect(response?.status()).toBe(200)

      expect(page.url()).toContain("/home")
    })
  })
})
