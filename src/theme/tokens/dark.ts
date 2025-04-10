"use client"

import { theme, type ThemeConfig } from "antd"

const globalTokens = theme.getDesignToken()

const colors: ThemeConfig["token"] = {
  colorBgBase: "#191724",
  colorBgContainer: "#1f1d2e",
  colorBgElevated: "#26233a",
  colorTextBase: "#e0def4",
  colorPrimaryTextHover: "#ebbcba",
  colorTextSecondary: "#908caa",
  colorTextDisabled: "#6e6a86",
  colorPrimary: "#c4a7e7",
  colorPrimaryHover: "#ebbcba",
  colorPrimaryActive: "#9ccfd8",
  colorSuccess: "#9ccfd8",
  colorSuccessBg: "rgba(156, 207, 216, 0.2)",
  colorWarning: "#f6c177",
  colorError: "#eb6f92",
  colorInfo: "#31748f",
  colorBorder: "#6e6a86",
  colorBorderSecondary: "#26233a",
  colorFillSecondary: "#2a273f",
  colorFillTertiary: "#393552",
  controlItemBgActive: "#31748f",
  controlItemBgHover: "#3b334e",
  colorLink: "#31748f",
  colorLinkHover: "#9ccfd8",
  colorLinkActive: "#c4a7e7",
}

const padding: ThemeConfig["token"] = {
  paddingSM: 12,
  paddingLG: 24,
}

const margin: ThemeConfig["token"] = {
  marginSM: 12,
  marginLG: 24,
}

const token: ThemeConfig["token"] = {
  ...colors,
  ...padding,
  ...margin,
}

export const darkTheme: ThemeConfig = {
  cssVar: true,
  hashed: false,
  token,
  components: {
    Button: {
      fontSize: globalTokens.fontSizeLG,
    },
  },
}
