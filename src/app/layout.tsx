import "@ant-design/v5-patch-for-react-19"
import "@/styles/globals.style.css"
import { Mona_Sans, JetBrains_Mono } from "next/font/google"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { App, ConfigProvider } from "antd"
import { theme } from "@/theme"
import { AntdStylesProvider } from "@/providers/antd-styles.provider"
import { SessionProvider } from "@/providers/session.provider"
import { getServerSession } from "next-auth"
import { TSQProvider } from "@/providers/query.provider"
import { SearchProvider } from "@/providers/search.provider"

const monaSans = Mona_Sans({
  subsets: ["latin"],
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
})

export const metadata = {
  title: "POS App",
  description: "Point-Of-Sale app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={`${monaSans.className} ${jetBrainsMono.className}`}>
        <SessionProvider session={session}>
          <AntdStylesProvider>
            <ConfigProvider theme={theme.darkTheme}>
              <App>
                <TSQProvider>
                  <AntdRegistry>
                    <SearchProvider>{children}</SearchProvider>
                  </AntdRegistry>
                </TSQProvider>
              </App>
            </ConfigProvider>
          </AntdStylesProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
