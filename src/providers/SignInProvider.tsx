'use client'

import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { getSessionToken, isExpired } from '@/lib/utils'
import { SignIn } from '@/components/SignIn'

export default function SignInProvider ({
  children
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (session) {
      const token = getSessionToken(session)
      const expired = isExpired(token.expiresAt)
      if (expired) {
        signIn('spotify')
      }
    }
  }, [session])

  if (status == 'loading') {
    return null
  }

  if (status == 'unauthenticated') {
    return <SignIn />
  }

  return <>{children}</>
}
