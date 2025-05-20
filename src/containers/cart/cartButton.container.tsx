"use client"

import { Grid, Drawer } from "antd"
import "@/styles/cart.style.css"
import { useState } from "react"
import CartButton from "@/components/base/CartButton"
import { useCartStore } from "@/store/cart.store"
import { ShoppingCart } from "@/components/composite/cart/ShoppingCart"
import { useOrderStore } from "@/store/order.store"

const { useBreakpoint } = Grid

export const CartButtonContainer = () => {
  const [open, setOpen] = useState(false)
  const { items } = useCartStore()
  const { discounts, removeDiscount } = useOrderStore()

  const itemCount = items
    .map((i) => i.quantity)
    .reduce((partialSum, a) => partialSum + a, 0)

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
      <CartButton itemCount={itemCount} onClick={showDrawer} />
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
        <ShoppingCart
          items={items}
          discounts={discounts}
          removeDiscount={removeDiscount}
        />
      </Drawer>
    </>
  )
}
