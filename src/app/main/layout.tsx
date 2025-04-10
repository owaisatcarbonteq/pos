import { Layout } from "antd"
import { Content } from "antd/es/layout/layout"
import { ItemType } from "antd/es/menu/interface"
import { ReactNode } from "react"
import { AppHeader } from "@/components/AppHeader"

const MainLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const items: ItemType[] = Array.from({ length: 3 }).map((_, index) => ({
    key: String(index + 1),
    label: `nav ${index + 1}`,
  }))
  return (
    <Layout>
      <AppHeader menuItems={items} />
      <Content>{children}</Content>
    </Layout>
  )
}

export default MainLayout
