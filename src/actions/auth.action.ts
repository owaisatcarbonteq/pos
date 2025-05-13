import { signIn, signOut } from "next-auth/react"
import { isRedirectError } from "next/dist/client/components/redirect-error"

export const logInAction = async (providerId: string) => {
  try {
    await signIn(providerId, {
      redirect: true,
      callbackUrl: "/home",
    })
  } catch (error) {
    if (isRedirectError(error)) throw error
    console.error("Auth Actions", "Login", error)
    throw error
  }
}

export const logOutAction = async () => {
  try {
    await signOut({ redirect: true, callbackUrl: "/auth/login" })
  } catch (error) {
    if (isRedirectError(error)) throw error
    console.error("Auth Actions", "Logout", error)
    throw error
  }
}
