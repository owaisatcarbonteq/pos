import { encode } from "next-auth/jwt"

export async function generateSessionToken() {
  const token = await encode({
    secret: process.env.AUTH_SECRET!,
    token: {
      name: "Test Merchant",
      email: "test-merchant@square.com",
      sub: "test-merchant-id",
    },
  })

  return token
}
