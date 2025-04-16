"use client"

import { useSearch } from "@/hooks/search.hook"
import { Input, theme } from "antd"
import { FC } from "react"

export const SearchBar: FC = () => {
  const { token } = theme.useToken()
  const { query, setQuery } = useSearch()
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
        fontSize: 20,
        color: token.colorPrimary,
      }}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}
