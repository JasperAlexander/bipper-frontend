import NextAuth, { User } from "next-auth"
import type { NextAuthOptions } from 'next-auth'
import clientPromise from "../../../utils/mongodb"
import GoogleProvider from "next-auth/providers/google"
import { OAuth2Client } from "google-auth-library"
import CredentialsProvider from 'next-auth/providers/credentials'
import { userType } from "@/types/userTypes"
// import TwitterProvider from "next-auth/providers/twitter"
// import EmailProvider from "next-auth/providers/email"
// import AppleProvider from "next-auth/providers/apple"

const googleAuthClient = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_ID)

export const authOptions: NextAuthOptions = {
  providers: [
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: {
    //     appleId: process.env.APPLE_ID,
    //     teamId: process.env.APPLE_TEAM_ID,
    //     privateKey: process.env.APPLE_PRIVATE_KEY,
    //     keyId: process.env.APPLE_KEY_ID,
    //   },
    // }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string,
    }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET,
    // }),
    CredentialsProvider({
      id: 'googleonetap',
      name: 'google-one-tap',
      credentials: {
        credential: { type: 'text' },
      },
      async authorize(credentials, req) {
        const token = (credentials as unknown as any).credential
        const ticket = await googleAuthClient.verifyIdToken({
          idToken: token,
          audience: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
        })
        const payload = ticket.getPayload()

        if (!payload) {
          return null
        }

        return payload as unknown as User
      },
    }),
  ],
  secret: process.env.SECRET,

  session: {
    strategy: 'jwt'
  },

  jwt: {
    secret: process.env.SECRET,
  },

  pages: {
    // signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const client = await clientPromise
      await client.connect()
      const db = client.db('bipper')
      const collection = db.collection('users')

      const checkUser = await collection.findOne({
        email: user.email,
      })

      if (checkUser) {
        return true
      } else {
        await collection.insertOne({
          email: user.email,
          name: user.name,
          username: user.name ? user.name.replace(/\s/g, '') : 'random',
          createdAt: new Date(),
          description: '',
          profileImg: user.image !== null ? user.image : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png',
          bannerImg: '',
          dob: 0,
          location: '',
          url: '',
          pinnedBeep: '',
          protected: false,
          config: '',
        })
        return true
      }
    },
    // async redirect({ url, baseUrl }) { return baseUrl },
    async session({ session, token, user }) { 
      if (!session) return session

      const client = await clientPromise
      await client.connect()
      const db = client.db('bipper')
      const collection = db.collection('users')

      const userData = await collection.findOne({
        email: session.user.email,
      })

      session.user._id = userData?._id
      session.user.email = userData?.email
      session.user.name = userData?.name
      session.user.username = userData?.username
      session.user.createdAt = userData?.createdAt
      session.user.description = userData?.description
      session.user.profileImg = userData?.profileImg
      session.user.bannerImg = userData?.bannerImg
      session.user.dob = userData?.dob
      session.user.location = userData?.location
      session.user.url = userData?.url
      session.user.pinnedBeep = userData?.pinnedBeep
      session.user.protected = userData?.protected
      session.user.config = userData?.config

      return session
    },
    // async jwt({ token, user, account, profile, isNewUser }) { return token }
  },

  events: {},

  debug: false,
}

export default NextAuth(authOptions)
