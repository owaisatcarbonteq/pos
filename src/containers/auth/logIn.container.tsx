"use client"

import { logInAction } from "@/actions/auth.action"
import { FC } from "react"
import { Button, Flex, Image, theme } from "antd"
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
                  "brightness(0) invert(78%) sepia(7%) saturate(1109%) hue-rotate(314deg) brightness(105%) contrast(84%)",
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
