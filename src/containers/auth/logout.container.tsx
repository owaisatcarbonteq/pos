"use client"

import { logOutAction } from "@/actions/auth.action"
import { LogoutOutlined } from "@ant-design/icons"
import { Button } from "antd"

export const LogoutContainer = () => {
  const handleLogOut = async () => await logOutAction()
  return (
    <Button
      type="link"
      onClick={handleLogOut}
      icon={<LogoutOutlined />}
      style={{ fontSize: 26 }}
    />
  )
}
