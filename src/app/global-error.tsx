"use client"

import { Logo } from "@/components/base/Logo"
import { RoseBird } from "@/components/base/RoseBird"
import "@/styles/login.style.css"
import { Col, Flex, Result, Row, Typography } from "antd"

const GlobalError = ({ error }: { error: Error }) => {
  return (
    <Row style={{ height: "100vh" }}>
      <Col xs={0} sm={0} md={14} lg={16} xl={16}>
        <RoseBird fill style={{ objectFit: "cover" }} />
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
        <Result
          status={"error"}
          title={
            <Typography.Text type="danger">{error.message}</Typography.Text>
          }
        />
        <Col />
        <Col />
      </Col>
    </Row>
  )
}

export default GlobalError
