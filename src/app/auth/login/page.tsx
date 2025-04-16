"use server"

import { NextPage } from "next"
import LoginContainer from "@/containers/auth/logIn.container"
import { authOptions } from "@/auth"

const LogIn: NextPage = async () => {
  return (
    <LoginContainer
      providers={authOptions.providers.map((p) => ({
        id: p.id,
        name: p.name,
        //@ts-ignore
        style: p.style,
        type: p.type,
      }))}
    />
  )
}

export default LogIn
