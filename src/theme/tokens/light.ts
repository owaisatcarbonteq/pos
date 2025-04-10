"use client"

import { theme, type ThemeConfig } from "antd"

const globalTokens = theme.getDesignToken()

const colors: ThemeConfig["token"] = {
  colorBgBase: "#faf4ed",
  colorBgContainer: "#fffaf3",
  colorBgElevated: "#f2e9e1",
  colorTextBase: "#575279",
  colorPrimaryTextHover: "#d7827e",
  colorTextSecondary: "#797593",
  colorTextDisabled: "#9893a5",
  colorPrimary: "#907aa9",
  colorPrimaryHover: "#d7827e",
  colorPrimaryActive: "#56949f",
  colorSuccess: "#56949f",
  colorSuccessBg: "rgba(86, 148, 159, 0.2)",
  colorWarning: "#ea9d34",
  colorError: "#b4637a",
  colorInfo: "#286983",
  colorBorder: "#cecacd",
  colorBorderSecondary: "#f2e9e1",
  colorFillSecondary: "#f4ede8",
  colorFillTertiary: "#efebe6",
  controlItemBgActive: "#286983",
  controlItemBgHover: "#f0e9e2",
  colorLink: "#286983",
  colorLinkHover: "#56949f",
  colorLinkActive: "#907aa9",
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

export const lightTheme: ThemeConfig = {
  cssVar: true,
  hashed: false,
  token,
  components: {
    Button: {
      fontSize: globalTokens.fontSizeLG,
    },
  },
}
