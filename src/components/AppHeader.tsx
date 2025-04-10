import { Col, Menu, Row } from "antd"
import { Header } from "antd/es/layout/layout"
import { Logo } from "./Logo"
import { SearchBar } from "./SearchBar"
import { LogOutButton } from "./LogOutButton"
import { ItemType } from "antd/es/menu/interface"

export const AppHeader = ({ menuItems }: { menuItems: ItemType[] }) => {
  return (
    <Header
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Row
        style={{
          alignItems: "center",
          backgroundColor: "#191724",
          borderRadius: 8,
          width: "50%",
          height: "fit-content",
          paddingLeft: 12,
        }}
      >
        <Col>
          <Logo />
        </Col>
        <Col flex={1} style={{ marginRight: 8, marginLeft: 8 }}>
          <SearchBar />
        </Col>
        <Col>
          <Menu mode="horizontal" items={menuItems} />
        </Col>
      </Row>
      <LogOutButton />
    </Header>
  )
}
