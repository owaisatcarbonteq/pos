import Image, { ImageProps } from "next/image"
import { FC } from "react"
import "../../styles/productCard.style.css"

export const ImageSuspense: FC<ImageProps> = (props: ImageProps) => (
  <Image
    {...props}
    priority={props.priority ?? false}
    className={props.className}
    width={props.width ?? 0}
    height={props.height ?? 0}
    placeholder="blur"
    blurDataURL={`${props.src}?blur`}
    loading="lazy"
    src={props.src}
    alt={props.alt}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
)
