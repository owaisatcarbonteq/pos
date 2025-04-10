"use client"

import { Space, theme } from "antd"
export default function Home() {
  const { token } = theme.useToken()
  return (
    <Space
      style={{
        backgroundColor: token.colorBgBase,
        height: "100vh",
        width: "100vw",
      }}
    >
      Home
    </Space>
  )
}
