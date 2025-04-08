import NextAuth from "next-auth"
import SquareProvider from "@/lib/providers/square"
import config from "@/config"

const handler = NextAuth({
  providers: [
    SquareProvider({
      clientId: config.square.APPLICATION_ID,
      clientSecret: config.square.APPLICATION_SECRET,
    }),
  ],
  secret: config.nextauth.secret,
})

export { handler as GET, handler as POST }
