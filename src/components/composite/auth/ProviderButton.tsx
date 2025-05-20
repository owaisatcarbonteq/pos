import { ILogInProps } from "@/containers/auth/logIn.container"
import { Button } from "antd"
import Image from "next/image"
import { FC } from "react"

type Provider = ILogInProps["providers"][0]

type IProviderButtonProps = {
  provider: Provider
  submit: (providerId: Provider["id"]) => Promise<void>
}

const ProviderButton: FC<IProviderButtonProps> = ({ provider, submit }) => {
  return (
    <Button
      block
      icon={
        <Image
          src={provider.style?.logo as string}
          alt={provider.name}
          height={30}
          width={300}
          style={{
            filter:
              "brightness(0) invert(64%) sepia(87%) saturate(151%) hue-rotate(224deg) brightness(93%) contrast(94%)",
          }}
        />
      }
      size="large"
      key={provider.id}
      type="dashed"
      onClick={() => submit(provider.id)}
      style={{
        color: provider.style?.textDark,
        borderRadius: 8,
        width: "100%",
        padding: 36,
      }}
    />
  )
}

export default ProviderButton
