"use client"

import { Badge, Button, Drawer, theme } from "antd"
import { ShoppingCartOutlined } from "@ant-design/icons"
import "@/styles/cart.style.css"
import { useState } from "react"
import { useCart } from "@/hooks/cart.hook"
import { ProductCard } from "../components/composite/ProductCard"

export const ShoppingCartButton = () => {
  const { token } = theme.useToken()
  const [open, setOpen] = useState(false)
  const { items, removeFromCart, clearCart } = useCart()

  const showDrawer = () => {
    setOpen(true)
  }

  const hideDrawer = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        type="link"
        onClick={showDrawer}
        icon={
          <Badge dot color={token.colorError}>
            <ShoppingCartOutlined
              className="cart-icon"
              style={{ fontSize: 30 }}
            />
          </Badge>
        }
      />
      <Drawer title="Cart" onClose={hideDrawer} open={open}>
        {items.map((i) => (
          <ProductCard product={i.product} />
        ))}
      </Drawer>
    </>
  )
}
