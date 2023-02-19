'use client'

import AddGIFButton from '@/app/addgifbutton'
import AddMediaButton from '@/app/addmediabutton'
import { createBeep } from '@/utils/queries'
import { useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRef } from 'react'
import styles from '@/app/beep/[username]/[id]/replytobeep.module.css'

export default function ReplyToBeep({
  beepID,
  beepUserUsername,
}: {
  beepID: string
  beepUserUsername: string
}) {
  const session = useSession()
  const beepInput = useRef<HTMLInputElement>(null)
  const [addBeep] = useMutation(createBeep)
  const reply = async () => {
    await addBeep({
      variables: {
        userId: session.data!.user,
        text: beepInput.current?.value,
        referenceID: beepID,
      },
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Replying to</span>
        <span className={styles.replyToUserUsername}>@{beepUserUsername}</span>
      </div>
      <div className={styles.main}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatar} />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTop}>
            <input
              type='text'
              placeholder='Beep your reply'
              className={styles.input}
              ref={beepInput}
            />
            <button
              type='button'
              className={styles.topReplyButton}
              onClick={reply}
            >
              Reply
            </button>
          </div>
          <div className={styles.buttons}>
            <div className={styles.leftButtons}>
              <AddMediaButton />
              <AddGIFButton />
            </div>
            <button
              type='button'
              className={styles.bottomReplyButton}
              onClick={reply}
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
