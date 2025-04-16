"use client"

import { logInAction } from "@/actions/auth.action"
import { FC } from "react"
import { Button, Flex, Image } from "antd"
import { OAuthProviderButtonStyles } from "next-auth/providers/index"

type LogInProps = {
  providers: {
    id: string
    name: string
    type: string
    style?: OAuthProviderButtonStyles
  }[]
}

const LoginContainer: FC<LogInProps> = ({ providers }: LogInProps) => {
  const submit = async (providerId: string) => await logInAction(providerId)
  return (
    <Flex
      vertical
      gap="small"
      style={{
        width: "100%",
        height: "fit-content",
      }}
    >
      {Object.values(providers || []).map((provider) => (
        <Button
          block
          icon={
            <Image
              src={provider.style?.logo}
              style={{
                height: "30px",
                filter:
                  "brightness(0) invert(64%) sepia(87%) saturate(151%) hue-rotate(224deg) brightness(93%) contrast(94%);",
              }}
              preview={false}
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
      ))}
    </Flex>
  )
}

export default LoginContainer
