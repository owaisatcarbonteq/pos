import { RoseBird } from "@/components/RoseBird"
import { Col, Row } from "antd"
import Title from "antd/es/typography/Title"
import { ReactNode } from "react"

const LoginLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <Row style={{ height: "100vh" }}>
      <Col xs={0} sm={0} md={12} lg={13} xl={13}>
        <RoseBird height="100%" style={{ objectFit: "cover" }} />
      </Col>
      <Col
        xs={24}
        sm={24}
        md={12}
        lg={11}
        xl={11}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          padding: "45px 0px",
          backgroundColor: "#191724",
        }}
      >
        <Title>POS</Title>
        {children}
        <Col />
      </Col>
    </Row>
  )
}

export default LoginLayout
