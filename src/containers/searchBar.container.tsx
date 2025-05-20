"use client"

import SearchBarInput from "@/components/composite/SearchBarInput"
import { DEBOUNCE_MS } from "@/constants"
import { useDebounce } from "@/hooks/debounce.hook"
import { useSearchStore } from "@/store/search.store"
import { ChangeEvent, FC, useEffect, useState } from "react"

export const SearchBar: FC = () => {
  const { query, setQuery } = useSearchStore()
  const [inputValue, setInputValue] = useState(query)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    <SearchBarInput
      inputValue={inputValue}
      handleInputChange={handleInputChange}
    />
  )
}
