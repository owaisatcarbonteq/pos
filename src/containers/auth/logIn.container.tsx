"use client"

import { logInAction } from "@/actions/auth.action"
import { FC } from "react"
import { Flex } from "antd"
import { OAuthProviderButtonStyles } from "next-auth/providers/index"
import ProviderButton from "@/components/composite/auth/ProviderButton"

export type ILogInProps = {
  providers: {
    id: string
    name: string
    type: string
    style?: OAuthProviderButtonStyles
  }[]
}

const LoginContainer: FC<ILogInProps> = ({ providers }) => {
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
        <ProviderButton key={provider.id} provider={provider} submit={submit} />
      ))}
    </Flex>
  )
}

export default LoginContainer
