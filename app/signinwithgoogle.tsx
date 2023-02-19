'use client'

import { signIn } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import styles from './signincontainer.module.css'

export default function SignInWithGoogle() {
  const googleSigninContainer = useRef<HTMLDivElement>(null)
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false)
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      !isLoadingGoogle &&
      googleSigninContainer.current
    ) {
      ;(window as any).handleSignin = () => {
        signIn('google', { callbackUrl: `${process.env.NEXT_PUBLIC_URL}/home` })
      }
      const { google } = window as any
      if (google) {
        google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_ID,
          callback: async (response: any) => {
            setIsLoadingGoogle(true)
            await signIn('googleonetap', {
              credential: response.credential,
              redirect: true,
              callbackUrl: `${process.env.NEXT_PUBLIC_URL}/home`,
            })
            setIsLoadingGoogle(false)
          },
          itp_support: true,
        })

        google.accounts.id.renderButton(googleSigninContainer.current, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'signup_with',
          shape: 'pill',
          logo_alignment: 'center',
          width: '100%',
        })

        google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed()) {
            console.log(notification.getNotDisplayedReason())
          } else if (notification.isSkippedMoment()) {
            console.log(notification.getSkippedReason())
          } else if (notification.isDismissedMoment()) {
            console.log(notification.getDismissedReason())
          }
        })
      }
    }
  })

  return (
    <div
      ref={googleSigninContainer}
      // className={styles.signInButton}
    />
  )
}
