"use server"

import { NextPage } from "next"
import LoginContainer from "@/containers/auth/logIn.container"
import { authProviders } from "@/auth"

const LogIn: NextPage = async () => {
  return (
    <LoginContainer
      providers={authProviders.map((p) => ({
        id: p.id,
        name: p.name,
        style: p.style,
        type: p.type,
      }))}
    />
  )
}

export default LogIn
