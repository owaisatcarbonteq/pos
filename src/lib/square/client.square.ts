import { auth } from "@/auth"
import { SquareClient, SquareEnvironment } from "square"

export const createSquareClient = async (): Promise<SquareClient | null> => {
  const session = await auth()

  if (!session) {
    return null
  }

  const squareClient = new SquareClient({
    token: session?.accessToken,
    environment: SquareEnvironment.Sandbox,
  })

  return squareClient
}
