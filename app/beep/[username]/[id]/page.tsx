'use client'

import Spinner from '@/app/spinner'
import { beepType } from '@/types/beepTypes'
import { getBeepByID } from '@/utils/queries'
import { Fragment, useEffect } from 'react'
import styles from '@/app/beep/[username]/[id]/page.module.css'
import Link from 'next/link'
import MoreOptionsButton from '@/app/moreoptionsbutton'
import ReplyToBeep from '@/app/beep/[username]/[id]/replytobeep'
import BeepLikeButton from '@/app/beeplikebutton'
import BeepRebeepButton from '@/app/beeprebeepbutton'
import BeepReplyButton from '@/app/beepreplybutton'
import BeepShareButton from '@/app/beepsharebutton'
import { useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'

export default function BeepPage({
  params,
}: {
  params: { id: string; username: string }
}) {
  const beepID = params.id
  const { loading, error, data, startPolling, fetchMore, refetch } = useQuery(
    getBeepByID,
    {
      variables: {
        id: beepID,
      },
    }
  )
  const beep: beepType | undefined = data?.getBeepByID

  useEffect(() => {
    startPolling(30000)
  }, [startPolling])

  const session = useSession()

  if (beep?.id) {
    return (
      <div className={styles.beepContainer}>
        <div className={styles.beepHeader}>
          <div className={styles.beepAvatarContainer}>
            <div className={styles.beepAvatar} />
          </div>
          <div className={styles.beepUserNamesContainer}>
            <Link
              href={`/${beep.user.username}`}
              className={styles.beepUserNames}
            >
              <div className={styles.beepUserName}>
                <span>{beep.user.name}</span>
                {beep.user.config === 'verified' && (
                  <svg
                    viewBox='0 0 24 24'
                    aria-label='Verified account'
                    role='img'
                    data-testid='icon-verified'
                    className={styles.beepUserVerified}
                  >
                    <g>
                      <path d='M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z'></path>
                    </g>
                  </svg>
                )}
              </div>
              <div className={styles.beepUserUsername}>
                <span>@{beep.user.username}</span>
              </div>
            </Link>
          </div>
          <div className={styles.moreOptionsButtonContainer}>
            <MoreOptionsButton />
          </div>
        </div>
        <div className={styles.beepContent}>
          <span>{beep.text}</span>
        </div>
        <button type='button' className={styles.beepTranslateButton}>
          Translate beep
        </button>
        <div className={styles.beepInfo}>
          {beep.createdAt && (
            <Fragment>
              <Link href='/' className={styles.beepCreatedAt}>
                {new Intl.DateTimeFormat('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  timeZone: 'America/Los_Angeles',
                }).format(new Date(beep.createdAt))}
                {' · '}
                {new Intl.DateTimeFormat('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }).format(new Date(beep.createdAt))}
              </Link>
              <span>·</span>
            </Fragment>
          )}
          <span className={styles.beepViewCount}>{beep.impressionCount}</span>
          <span>Views</span>
        </div>
        <div className={styles.beepCounters}>
          <Link href='/rebeeps' className={styles.beepCounter}>
            <span>{beep.rebeepCount}</span>
            <span className={styles.beepCounterText}> Rebeeps</span>
          </Link>
          <Link href='/quote' className={styles.beepCounter}>
            <span>{beep.quoteCount}</span>
            <span className={styles.beepCounterText}> Quote Beeps</span>
          </Link>
          <Link href='/likes' className={styles.beepCounter}>
            <span>{beep.likeCount}</span>
            <span className={styles.beepCounterText}> Likes</span>
          </Link>
        </div>
        <div className={styles.beepButtons}>
          <BeepReplyButton />
          <BeepRebeepButton />
          <BeepLikeButton beepID={beep.id} />
          <BeepShareButton />
        </div>
        {session && (
          <ReplyToBeep beepID={beep.id} beepUserUsername={beep.user.username} />
        )}
      </div>
    )
  } else {
    return (
      <div className={styles.beepNotAvailable}>
        {loading && <Spinner />}
        {error && <p>Oh no... {error.message}</p>}
        {!loading && !error && (
          <span>
            Hmm...this beep doesn’t exist. Try searching for something else.
          </span>
        )}
      </div>
    )
  }
}
