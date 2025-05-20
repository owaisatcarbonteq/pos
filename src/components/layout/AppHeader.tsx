"use client"

import { Affix, Divider, Flex, Space } from "antd"
import { Header } from "antd/es/layout/layout"
import { Logo } from "../base/Logo"
import { SearchBar } from "../../containers/searchBar.container"
import { LogoutContainer } from "../../containers/auth/logout.container"
import { CartButtonContainer } from "../../containers/cart/cartButton.container"

export const AppHeader = () => {
  return (
    <Affix offsetTop={4} style={{ backgroundColor: "#191724" }}>
      <Header
        className="app-header"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 0,
          border: "solid",
          borderWidth: 1,
          borderRadius: 8,
          boxShadow: "0px 10px 30px #191724, 0px -10px 30px #191724",
        }}
      >
        <Space
          style={{
            alignItems: "center",
            width: "fit-content",
            height: "fit-content",
            paddingLeft: 20,
            paddingRight: 5,
            flexWrap: "nowrap",
            gap: 10,
          }}
        >
          <Logo style={{ display: "block" }} />
        </Space>
        <SearchBar />
        <Flex
          style={{
            display: "flex",
            flexDirection: "row",
            paddingLeft: 5,
            paddingRight: 20,
            alignItems: "center",
            gap: 12,
          }}
        >
          <CartButtonContainer />
          <Divider type="vertical" />
          <LogoutContainer />
        </Flex>
      </Header>
    </Affix>
  )
}
