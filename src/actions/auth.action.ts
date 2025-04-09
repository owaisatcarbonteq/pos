import { signIn } from "next-auth/react"
import { isRedirectError } from "next/dist/client/components/redirect-error"

export const logInAction = async (providerId: string) => {
  try {
    await signIn(providerId, {
      redirectTo: "/",
      redirect: true,
      callbackUrl: "/",
    })
  } catch (error) {
    if (isRedirectError(error)) throw error
    console.error("Auth Actions", "Login", error)
    throw error
  }
}
