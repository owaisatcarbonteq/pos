import NextAuth from "next-auth"
import { authProviders } from "@/auth"
import config from "@/config"

const handlers = NextAuth({
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
export { handlers as GET, handlers as POST }
