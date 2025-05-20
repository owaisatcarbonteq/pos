import Image, { ImageProps } from "next/image"

type TRoseBirdProps = Omit<ImageProps, "src" | "alt">
export const RoseBird = (props: TRoseBirdProps) => (
  <Image priority src="/assets/rosebird.png" alt={"rosebird"} {...props} />
)
