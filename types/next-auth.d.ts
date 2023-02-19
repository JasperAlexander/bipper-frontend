import NextAuth from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      _id: ObjectId | undefined
      email: string | null | undefined
      name: string | null | undefined
      username: string | null | undefined
      createdAt: string | null | undefined
      description: string | null | undefined
      profileImg: string | null | undefined
      bannerImg: string | null | undefined
      dob: string | null | undefined
      location: string | null | undefined
      url: string | null | undefined
      pinnedBeep: string | null | undefined
      protected: string | null | undefined
      config: string | null | undefined
    }
  }
}