import { Image, ImageProps } from "antd"

type TRoseBirdProps = Omit<ImageProps, "src" | "alt">
export const RoseBird = (props: TRoseBirdProps) => (
  <Image
    src="/assets/rosebird.png"
    alt={"rosebird"}
    {...props}
    preview={false}
  />
)
