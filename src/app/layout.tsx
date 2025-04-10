import type { Metadata } from "next"
import { Mona_Sans, JetBrains_Mono } from "next/font/google"
import "@/styles/globals.style.css"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { App, ConfigProvider } from "antd"
import { theme } from "@/theme"
import { AntdStylesProvider } from "@/providers/antd-styles.provider"
import { SessionProvider } from "@/providers/session.provider"
import { getServerSession } from "next-auth"

const monaSans = Mona_Sans({
  subsets: ["latin"],
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
})

export const metadata: Metadata = {
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
                <AntdRegistry>{children}</AntdRegistry>
              </App>
            </ConfigProvider>
          </AntdStylesProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
