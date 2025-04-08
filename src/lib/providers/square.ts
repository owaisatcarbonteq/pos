import { OAuthConfig } from "next-auth/providers/oauth"
import { Square } from "square"

const SquareProvider = (config: {
  clientId: string
  clientSecret: string
}): OAuthConfig<{ merchant: Square.Merchant }> => ({
  id: "square",
  name: "Square",
  type: "oauth",
  authorization: {
    url: "https://connect.squareupsandbox.com/oauth2/authorize",
    params: {
      scope: "MERCHANT_PROFILE_READ PAYMENTS_READ",
    },
  },
  token: {
    url: "https://connect.squareupsandbox.com/oauth2/token",
    async request(context) {
      const { provider, params } = context
      const response = await fetch(
        "https://connect.squareupsandbox.com/oauth2/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            client_id: provider.clientId,
            client_secret: provider.clientSecret,
            code: params.code,
            grant_type: "authorization_code",
            redirect_uri: provider.callbackUrl,
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(`Square token error: ${JSON.stringify(data)}`)
      }

      return {
        tokens: {
          access_token: data.access_token,
          token_type: data.token_type,
          expires_at: Math.floor(Date.now() / 1000) + data.expires_in,
          refresh_token: data.refresh_token,
        },
      }
    },
  },
  userinfo: {
    url: "https://connect.squareupsandbox.com/v2/merchants/me",
    async request(context) {
      const { tokens } = context
      const response = await fetch(
        "https://connect.squareupsandbox.com/v2/merchants/me",
        {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            Accept: "application/json",
          },
        },
      )
      return response.json()
    },
  },
  profile({ merchant }) {
    return {
      id: merchant.id!,
      name: merchant.businessName,
      email:
        `${merchant.businessName
          ?.replace(/\s+/g, "-")
          .toLowerCase()}@square.com` || null,
      image: null,
    }
  },
  style: {
    bg: "#FFF",
    text: "#000",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/30/Square%2C_Inc._-_Square_logo.svg",
  },
  ...config,
})

export default SquareProvider
