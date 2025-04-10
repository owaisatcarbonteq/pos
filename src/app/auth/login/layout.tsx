import { Logo } from "@/components/Logo"
import { RoseBird } from "@/components/RoseBird"
import { Col, Flex, Row } from "antd"
import { ReactNode } from "react"
import "@/styles/login.style.css"

const LoginLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <Row style={{ height: "100vh" }}>
      <Col xs={0} sm={0} md={14} lg={16} xl={16}>
        <RoseBird height="100%" style={{ objectFit: "cover" }} />
      </Col>
      <Col
        xs={24}
        sm={24}
        md={10}
        lg={8}
        xl={8}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          padding: "45px 45px",
          backgroundColor: "#191724",
        }}
      >
        <Flex className="logo-wrapper" style={{ width: "100%" }}>
          <Logo />
        </Flex>

        {children}
        <Col />
        <Col />
      </Col>
    </Row>
  )
}

export default LoginLayout
