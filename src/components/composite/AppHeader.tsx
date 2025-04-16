import { Col, Divider, Flex, Row, Space } from "antd"
import { Header } from "antd/es/layout/layout"
import { Logo } from "../base/Logo"
import { SearchBar } from "../../containers/SearchBar"
import { LogOutButton } from "../base/LogOutButton"
import { ItemType } from "antd/es/menu/interface"
import { ShoppingCartButton } from "../../containers/ShoppingCartButton"

export const AppHeader = ({ menuItems }: { menuItems: ItemType[] }) => {
  return (
    <Header
      style={{
        display: "flex",
        position: "sticky",
        top: 0,
        zIndex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 0,
        padding: 0,
      }}
    >
      <Space
        style={{
          alignItems: "center",
          backgroundColor: "#191724",
          width: "fit-content",
          height: "fit-content",
          paddingLeft: 40,
          paddingRight: 20,
          flexWrap: "nowrap",
          gap: 10,
        }}
      >
        <Col>
          <Logo />
        </Col>
        <Col>
          <SearchBar />
        </Col>
      </Space>
      <Flex
        style={{
          display: "flex",
          flexDirection: "row",
          paddingLeft: 20,
          paddingRight: 40,
          alignItems: "center",
          gap: 12,
        }}
      >
        <ShoppingCartButton />
        <Divider type="vertical" />
        <LogOutButton />
      </Flex>
    </Header>
  )
}
