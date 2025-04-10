"use client"

import { logInAction } from "@/actions/auth.action"
import { FC } from "react"
import { Button, Flex, Image, Typography } from "antd"
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
        width: "fit-content",
        height: "fit-content",
      }}
    >
      <Typography.Text>Sign In with</Typography.Text>
      {Object.values(providers || []).map((provider) => (
        <Button
          block
          icon={<Image src={provider.style?.logo} style={{ height: "20px" }} />}
          size="large"
          key={provider.id}
          type="primary"
          onClick={() => submit(provider.id)}
          style={{
            backgroundColor: provider.style?.bg,
            color: provider.style?.text,
          }}
        >
          {provider.name}
        </Button>
      ))}
    </Flex>
  )
}

export default LoginContainer
