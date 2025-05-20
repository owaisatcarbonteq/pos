import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      merchant_id?: string
    } & DefaultSession["user"]
    accessToken?: string
    error?: string
  }

  interface User extends DefaultUser {
    id: string
    merchant_id?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    accessTokenExpires?: number
    error?: string
    user?: User
  }
}
