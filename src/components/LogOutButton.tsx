"use client"

import { logOutAction } from "@/actions/auth.action"
import { LogoutOutlined } from "@ant-design/icons"
import Link from "antd/es/typography/Link"

export const LogOutButton = () => {
  const handleLogOut = async () => await logOutAction()
  return (
    <Link onClick={handleLogOut} style={{ fontSize: 26, color: "#ebbcba" }}>
      <LogoutOutlined />
    </Link>
  )
}
