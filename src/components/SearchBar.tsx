"use client"

import { Input, theme } from "antd"
import { FC } from "react"

export const SearchBar: FC = () => {
  const { token } = theme.useToken()
  return (
    <Input
      style={{
        padding: 6,
        marginBottom: 0,
        marginTop: 5,
        outlineStyle: "none",
        borderStyle: "none",
        borderBottomStyle: "solid",
        borderRadius: 0,
        borderBottomColor: token.colorPrimary,
        backgroundColor: token.colorBgBase,
        boxShadow: "none",
      }}
    />
  )
}
