"use client"

import { useState } from "react"

import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs"
import { useServerInsertedHTML } from "next/navigation"

export const AntdStylesProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [cache] = useState(() => createCache())
  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    ></style>
  ))

  return <StyleProvider cache={cache}>{children}</StyleProvider>
}
