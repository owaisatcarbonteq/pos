"use client"

import { DEBOUNCE_MS } from "@/constants"
import { useDebounce } from "@/hooks/debounce.hook"
import { useSearch } from "@/hooks/search.hook"
import { Input, theme } from "antd"
import { FC, useEffect, useState } from "react"

export const SearchBar: FC = () => {
  const { token } = theme.useToken()
  const { query, setQuery } = useSearch()
  const [inputValue, setInputValue] = useState(query)

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value)
  }

  useDebounce(
    () => {
      setQuery(inputValue)
    },
    DEBOUNCE_MS,
    [inputValue]
  )

  useEffect(() => {
    setInputValue(query)
  }, [query])

  return (
    <Input
      style={{
        borderStyle: "none",
        borderBottomStyle: "solid",
        borderRadius: 0,
        borderBottomColor: token.colorPrimary,
      }}
      value={inputValue}
      onChange={handleInputChange}
    />
  )
}
