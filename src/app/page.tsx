"use client"

import { Flex, Spin, theme } from "antd"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function Home() {
  const { token } = theme.useToken()
  const router = useRouter()

  useEffect(() => {
    router.replace("/home")
  }, [router])

  return (
    <Flex
      justify="space-around"
      align="center"
      style={{
        backgroundColor: token.colorBgBase,
        height: "100vh",
        width: "100vw",
      }}
    >
      <Spin />
    </Flex>
  )
}
