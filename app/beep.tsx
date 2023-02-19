'use client'

import { beepType } from '@/types/beepTypes'
import Link from 'next/link'
import styles from './beep.module.css'
import TimeAgo from 'react-timeago'
import { Fragment, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BeepReplyButton from './beepreplybutton'
import BeepRebeepButton from './beeprebeepbutton'
import BeepLikeButton from './beeplikebutton'
import BeepAnalyticsButton from './beepanalyticsbutton'
import BeepShareButton from './beepsharebutton'
import MoreOptionsButton from './moreoptionsbutton'

export default function Beep({ beep }: { beep: beepType }) {
  const router = useRouter()

  useEffect(() => {
    router.prefetch(`/beep/${beep.user.username}/${beep.id}`)
  })

  return (
    <div
      className={styles.container}
      onClick={(e) => {
        e.preventDefault()
        router.push(`/beep/${beep.user.username}/${beep.id}`)
      }}
    >
      <div className={styles.topContainer}>
        {beep.reference.id && (
          <Fragment>
            <svg viewBox='0 0 24 24' aria-hidden='true'>
              <g>
                <path d='M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01z'></path>
              </g>
            </svg>
            <Link href='/status'>{beep.reference.user.name} has reacted</Link>
          </Fragment>
        )}
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatar} />
        </div>
        <div className={styles.middleMainContainer}>
          <div className={styles.beepTop}>
            <div className={styles.beepTopLeft}>
              <Link
                href={`/${beep.user.username}`}
                className={styles.beepUserTitleWithConfig}
              >
                <span className={styles.beepUserTitle}>{beep.user?.name}</span>
                {beep.user.config === 'verified' && (
                  <svg
                    viewBox='0 0 24 24'
                    aria-label='Geverifieerd account'
                    role='img'
                    className={styles.beepUserConfigIcon}
                  >
                    <g>
                      <path d='M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z'></path>
                    </g>
                  </svg>
                )}
              </Link>
              <Link href='/user' className={styles.beepUsername}>
                @{beep.user.username}
              </Link>
              <span className={styles.beepDot}>·</span>
              <span className={styles.beepDate}>
                {(new Date().getTime() - new Date(beep.createdAt).getTime()) /
                  (1000 * 3600 * 24) >
                28 ? (
                  new Intl.DateTimeFormat('en-US', {
                    day: 'numeric',
                    month: 'short',
                  }).format(new Date(beep.createdAt))
                ) : (
                  <TimeAgo
                    date={beep.createdAt}
                    formatter={(value, unit) => `${value} ${unit.charAt(0)}`}
                  />
                )}
              </span>
            </div>
            <div className={styles.beepTopRight}>
              <MoreOptionsButton />
            </div>
          </div>
          <div className={styles.beepMiddle}>
            <span>{beep.text}</span>
          </div>
          <div className={styles.beepBottom}>
            <BeepReplyButton nrOfReplies={beep.replyCount} />
            <BeepRebeepButton beepRebeepCount={beep.rebeepCount} />
            <BeepLikeButton beepID={beep.id} beepLikeCount={beep.likeCount} />
            <BeepAnalyticsButton nrOfImpressions={beep.impressionCount} />
            <BeepShareButton />
          </div>
        </div>
      </div>
    </div>
  )
}
