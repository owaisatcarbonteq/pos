"use client"

import { Grid, Badge, Button, Drawer, theme } from "antd"
import { ShoppingCartOutlined } from "@ant-design/icons"
import "@/styles/cart.style.css"
import { useState } from "react"
import { ShoppingCart } from "../../components/composite/cart/ShoppingCart"

const { useBreakpoint } = Grid

export const CartButtonContainer = () => {
  const { token } = theme.useToken()
  const [open, setOpen] = useState(false)

  const screens = useBreakpoint()
  const isMobile = !screens.md

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
      <Drawer
        title="Cart"
        size="large"
        onClose={hideDrawer}
        open={open}
        {...(isMobile && {
          styles: {
            body: {
              padding: 10,
            },
          },
        })}
      >
        <ShoppingCart />
      </Drawer>
    </>
  )
}
