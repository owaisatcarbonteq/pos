import { expect, Locator } from "@playwright/test"

export async function addVariantToCart(productCard: Locator, times = 1) {
  const variantSelector = productCard.locator(".ant-select").first()
  await variantSelector.click()

  const dropdown = productCard.page().locator(".ant-select-dropdown")
  await expect(dropdown).toBeVisible()

  const variantOption = dropdown
    .locator(".ant-select-item-option-content")
    .first()
  await variantOption.click()

  const addButton = productCard.locator(".anticon-plus").first()
  await Promise.all(
    Array.from({ length: times }).map(async (_) =>
      (await addButton.isVisible()) && (await addButton.isEnabled())
        ? addButton.click()
        : null
    )
  )
}

export async function removeVariantFromCart(productCard: Locator, times = 1) {
  const variantSelector = productCard.locator(".ant-select").first()
  await variantSelector.click()

  const dropdown = productCard.page().locator(".ant-select-dropdown")
  await expect(dropdown).toBeVisible()

  const variantOption = dropdown
    .locator(".ant-select-item-option-content")
    .first()
  await variantOption.click()

  const removeButton = productCard.locator(".anticon-minus").first()
  await Promise.all(
    Array.from({ length: times }).map(async (_) =>
      (await removeButton.isVisible()) && (await removeButton.isEnabled())
        ? removeButton.click()
        : null
    )
  )
}

export async function getCartCount(productCard: Locator): Promise<number> {
  const itemCounter = productCard.locator("input[disabled]")
  const value = await itemCounter.inputValue()
  return Number(value)
}
