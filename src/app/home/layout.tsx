import { AppHeader } from "@/components/composite/AppHeader"
import { Layout } from "antd"
import { Content } from "antd/es/layout/layout"
import { ReactNode } from "react"

const HomeLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <Layout style={{ minHeight: "100vh", overflowX: "hidden" }}>
      <AppHeader />
      <Content style={{ flex: 1, backgroundColor: "#191724" }}>
        {children}
      </Content>
    </Layout>
  )
}

export default HomeLayout
