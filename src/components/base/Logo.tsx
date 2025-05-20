import Image, { ImageProps } from "next/image"

type TLogoProps = Omit<ImageProps, "src" | "alt">
export const Logo = (props: TLogoProps) => (
  <Image
    priority
    className="logo"
    src="/assets/logo.svg"
    alt={"logo"}
    height={props.height ?? 50}
    width={props.width ?? 50}
    {...props}
  />
)
