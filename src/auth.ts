import NextAuth from "next-auth"
import SquareProvider from "@/lib/providers/square"
import config from "@/config"

export default NextAuth({
  providers: [
    SquareProvider({
      clientId: config.square.APPLICATION_ID,
      clientSecret: config.square.APPLICATION_SECRET,
    }),
  ],
  secret: config.nextauth.secret,
})
