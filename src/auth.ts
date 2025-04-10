import SquareProvider from "@/lib/auth/square.provider"
import config from "@/config"

export const authProviders = [
  SquareProvider({
    clientId: config.square.APPLICATION_ID,
    clientSecret: config.square.APPLICATION_SECRET,
  }),
]
