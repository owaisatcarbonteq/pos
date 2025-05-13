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
      colorLink: token.colorPrimary,
      colorLinkHover: token.colorPrimaryHover,
      colorLinkActive: token.colorPrimaryActive,
    },
    Layout: {
      headerHeight: 86,
      headerBg: token.colorBgBase,
      headerPadding: `${globalTokens.paddingSM}px ${globalTokens.paddingXL}px`,
      footerBg: token.colorBgBase,
      footerPadding: "60px 0",
      siderBg: token.colorBgBase,
      colorText: "rgba(196, 167, 231, 0.4)",
    },
    Menu: {
      itemBg: token.colorBgBase,
    },
    Divider: {
      colorSplit: token.colorPrimary,
      fontSize: 30,
    },
    Select: {
      activeOutlineColor: token.colorBgBase,
      optionSelectedBg: token.colorPrimaryActive,
      optionSelectedColor: token.colorBgBase,
      colorBorder: token.colorBorderSecondary,
      colorPrimaryHover: token.colorPrimary,
    },
    Card: {
      actionsLiMargin: "0",
      borderRadius: 4,
    },
    InputNumber: {
      controlWidth: 40,
    },
    List: {
      colorBorder: "rgba(256, 256, 256, 0)",
    },
    Skeleton: {
      blockRadius: 8,
      borderRadiusOuter: 8,
      borderRadius: 8,
      borderRadiusXS: 8,
      borderRadiusSM: 8,
      borderRadiusLG: 8,
    },
    Input: {
      colorBgContainer: token.colorBgBase,
      colorText: token.colorPrimary,
      paddingInline: 4,
      controlOutlineWidth: 0,
      boxShadow: "none",
      fontSize: 20,
    },
  },
}
