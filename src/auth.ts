import SquareProvider from "@/lib/auth/square.provider"
import config from "@/config"
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next"
import { getServerSession, NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    SquareProvider({
      clientId: config.square.APPLICATION_ID,
      clientSecret: config.square.APPLICATION_SECRET,
    }),
  ],
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
        token.accessToken = account.access_token
        return {
          ...token,
          ...user,
        }
      }

      return token
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken
      return {
        ...session,
        user: token,
      }
    },
  },
}

export const auth = (
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) => {
  return getServerSession(...args, authOptions)
}
