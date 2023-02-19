'use client'

import { createBeep } from '@/utils/queries'
import { useSession } from 'next-auth/react'
import { useRef } from 'react'
import { useMutation } from '@apollo/client'
import styles from './createbeep.module.css'
import AddMediaButton from '../addmediabutton'
import AddGIFButton from '../addgifbutton'

export default function CreateBeep() {
  const session = useSession()
  const user = session.data?.user

  const beepInput = useRef<HTMLInputElement>(null)
  const [addBeep] = useMutation(createBeep)
  const beep = async () => {
    console.log('session.data', session.data)
    console.log('beepInput.current?.value', beepInput.current?.value)
    await addBeep({
      variables: {
        userId: user!._id,
        text: beepInput.current?.value,
      },
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatar} />
      </div>
      <div className={styles.mainContainer}>
        <button type='button' className={styles.beepVisibility}>
          <span>Everyone</span>
          <svg viewBox='0 0 24 24' aria-hidden='true'>
            <g>
              <path d='M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z'></path>
            </g>
          </svg>
        </button>
        <input
          type='text'
          className={styles.beepInput}
          placeholder="What's happening?"
          ref={beepInput}
        />
        <button type='button' className={styles.beepAccessibility}>
          <svg viewBox='0 0 24 24' aria-hidden='true'>
            <g>
              <path d='M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-.25 10.48L10.5 17.5l-2-1.5v-3.5L7.5 9 5.03 7.59c1.42-2.24 3.89-3.75 6.72-3.84L11 6l-2 .5L8.5 9l5 1.5-1.75 1.73zM17 14v-3l-1.5-3 2.88-1.23c1.17 1.42 1.87 3.24 1.87 5.23 0 1.3-.3 2.52-.83 3.61L17 14z'></path>
            </g>
          </svg>
          <span>Everyone can reply</span>
        </button>
        <div className={styles.bottomContainer}>
          <div className={styles.beepOptions}>
            <AddMediaButton />
            <AddGIFButton />
          </div>
          <div className={styles.beepStatus}>
            <button
              type='button'
              className={styles.createBeepButton}
              onClick={beep}
            >
              Beep
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
