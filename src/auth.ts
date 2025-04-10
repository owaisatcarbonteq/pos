import NextAuth from "next-auth"
import SquareProvider from "@/lib/auth/square.provider"
import config from "@/config"

export const authProviders = [
  SquareProvider({
    clientId: config.square.APPLICATION_ID,
    clientSecret: config.square.APPLICATION_SECRET,
  }),
]

export default NextAuth({
  providers: authProviders,
  session: {
    strategy: "jwt",
  },
  secret: config.nextauth.secret,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt: async ({ user, account, token }) => {
      if (user && account) {
        return {
          ...token,
          ...user,
        }
      }

      return token
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: token,
      }
    },
  },
})
