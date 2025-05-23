"use client"

import { DEBOUNCE_MS } from "@/constants"
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { Grid, Button, Space, theme } from "antd"
import { FC, memo, useEffect, useMemo, useState } from "react"
import { debouncedUpdate } from "./debouncedUpdate.util"

const { useBreakpoint } = Grid

type CartQuantityProps = {
  upHandler: (quantity: number) => void
  upEnabled: boolean
  downHandler: (quantity: number) => void
  downEnabled: boolean
  quantity: number
  deleteHandler?: () => void
}

const QuantityControl: FC<CartQuantityProps> = memo(
  ({
    upHandler,
    upEnabled,
    downHandler,
    downEnabled,
    quantity,
    deleteHandler,
  }) => {
    const { token } = theme.useToken()
    const screens = useBreakpoint()
    const isMobile = !screens.md

    const [localQuantity, setLocalQuantity] = useState(quantity)
    const [handlingUp, setHandlingUp] = useState(false)
    const [handlingDown, setHandlingDown] = useState(false)

    useEffect(() => {
      setLocalQuantity(quantity)
    }, [quantity])

    const debouncedUp = useMemo(
      () => debouncedUpdate(upHandler, setHandlingUp, DEBOUNCE_MS),
      [upHandler]
    )

    const debouncedDown = useMemo(
      () => debouncedUpdate(downHandler, setHandlingDown, DEBOUNCE_MS),
      [downHandler]
    )

    const handleUpClick = () => {
      setLocalQuantity((q) => q + 1)
      debouncedUp()
    }

    const handleDownClick = () => {
      if (localQuantity > 0) {
        setLocalQuantity((q) => q - 1)
        debouncedDown()
      }
    }

    return (
      <Space
        style={{
          borderStyle: "solid",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: token.colorBorderSecondary,
          padding: isMobile ? 2 : 4,
          gap: isMobile ? 2 : 4,
        }}
      >
        <Button
          type="link"
          disabled={!upEnabled || handlingUp}
          onClick={handleUpClick}
          icon={<PlusOutlined key="add" />}
          style={{ backgroundColor: token.colorBorderSecondary }}
        />
        <input
          value={localQuantity}
          disabled
          style={{
            width: isMobile ? 20 : 30,
            height: isMobile ? 20 : 30,
            textAlign: "center",
            borderRadius: 4,
            boxShadow: "none",
            border: "none",
            backgroundColor: "transparent",
            color: token.colorPrimary,
          }}
        />
        <Button
          type="link"
          disabled={!downEnabled || localQuantity < 1 || handlingDown}
          onClick={handleDownClick}
          icon={<MinusOutlined key="remove" />}
          style={{ backgroundColor: token.colorBorderSecondary }}
        />
        {deleteHandler && (
          <Button
            type="link"
            disabled={!downEnabled || localQuantity < 1}
            onClick={deleteHandler}
            icon={<DeleteOutlined key="delete" />}
            style={{ backgroundColor: token.colorBorderSecondary }}
          />
        )}
      </Space>
    )
  },
  (prev, next) =>
    prev.quantity === next.quantity &&
    prev.upEnabled === next.upEnabled &&
    prev.downEnabled === next.downEnabled
)

QuantityControl.displayName = "QuantityControl"

export default QuantityControl
