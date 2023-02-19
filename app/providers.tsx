'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { ApolloProvider } from '@apollo/client'
import { graphQLClient } from '@/utils/graphqlclient'

export default function Providers({
  children,
  session,
}: {
  children: ReactNode
  session: Session | null
}) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={graphQLClient}>{children}</ApolloProvider>
    </SessionProvider>
  )
}
