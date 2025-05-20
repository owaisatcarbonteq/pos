import { Page } from "@playwright/test"
import { generateSessionToken } from "./generateSessionToken"

export const mockAuthentication = async (page: Page) => {
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
}
