"use client"

import { Image, ImageProps, Skeleton } from "antd"
import { FC, useState } from "react"

export const ImageSuspense: FC<ImageProps> = (props: ImageProps) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && (
        <Skeleton.Image
          active={true}
          style={{ width: props.width, height: props.height }}
        />
      )}
      <Image
        {...props}
        hidden={!loaded}
        width={loaded ? props.width : 0}
        height={loaded ? props.height : 0}
        onLoad={() => setLoaded(true)}
        src={props.src}
        alt={props.alt}
      />
    </>
  )
}
