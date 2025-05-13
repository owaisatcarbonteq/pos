import { Affix, Col, Divider, Flex, Space } from "antd"
import { Header } from "antd/es/layout/layout"
import { Logo } from "../base/Logo"
import { SearchBar } from "../../containers/searchBar.container"
import { LogoutContainer } from "../../containers/auth/logout.container"
import { CartButtonContainer } from "../../containers/cart/cartButton.container"

export const AppHeader = () => {
  return (
    <Affix offsetTop={4} style={{ backgroundColor: "#191724" }}>
      <Header
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 12,
          marginTop: 8,
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
