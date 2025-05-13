"use client"

import { Image, ImageProps, Skeleton } from "antd"
import { FC, memo, useEffect, useState } from "react"
import "../../styles/productCard.style.css"

const MAX_RETRIES = 10
const RETRY_DELAY_MS = 50

export const ImageSuspense: FC<ImageProps> = memo(
  (props: ImageProps) => {
    const [loaded, setLoaded] = useState(false)

    const [retryCount, setRetryCount] = useState(0)

    useEffect(() => {
      if (!props.src) return

      let cancelled = false

      const attemptLoad = () => {
        const preload = new window.Image()
        preload.src = props.src!

        preload.onload = () => {
          if (!cancelled) setLoaded(true)
        }

        preload.onerror = () => {
          if (retryCount < MAX_RETRIES && !cancelled) {
            setTimeout(() => {
              setRetryCount((count) => count + 1)
            }, RETRY_DELAY_MS)
          }
        }
      }

      attemptLoad()

      return () => {
        cancelled = true
      }
    }, [props.src, retryCount])

    return (
      <>
        {!loaded ? (
          <Skeleton.Image
            className={props.className}
            {...props}
            active={true}
            style={{
              width: `${loaded ? 0 : props.width}`,
              height: `${loaded ? 0 : props.height}`,
            }}
          />
        ) : (
          <Image
            className={props.className}
            {...props}
            width={loaded ? props.width : 0}
            height={loaded ? props.height : 0}
            onLoad={() => setLoaded(true)}
            src={props.src}
            alt={props.alt}
          />
        )}
      </>
    )
  },
  (prev, next) => prev.src !== next.src
)
