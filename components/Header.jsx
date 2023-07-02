'use client'

import {LoginButton} from "@/components/LoginButton";
import Image from "next/image";
import {signOut, useSession} from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    return (
        <div className='flex flex-col items-center justify-center h-screen -mt-16'>
          <h1>Welcome</h1>
          <span className='font-extrabold text-2xl'>{session.user.email}</span>
        </div>
    )
  }

  return (
      <div className='
      flex
      flex-col
      items-center
      justify-center
      h-screen -mt-16'>
        <h1>Login (Header)</h1>
        <LoginButton/>
      </div>
  )
}
