import { Image, ImageProps } from "antd"

type TLogoProps = Omit<ImageProps, "src" | "alt">
export const Logo = (props: TLogoProps) => (
  <Image
    className="logo"
    src="/assets/logo.svg"
    alt={"logo"}
    height={props.height ?? 50}
    width={props.width ?? 50}
    {...props}
    preview={false}
  />
)
