'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import styles from './profiletabs.module.css'

export default function ProfileTabs() {
  const pathname = usePathname()
  const [currentTab, setCurrentTab] = useState<string>('beeps')

  return (
    <div className={styles.headerBottom}>
      <Link
        href={pathname!}
        replace={true}
        onClick={() => setCurrentTab('beeps')}
        className={styles.headerTab}
      >
        <div
          className={`${styles.headerTabContent} ${
            currentTab === 'beeps' ? styles.headerTabActive : ''
          }`}
        >
          <span className={styles.headerTabSpan}>Beeps</span>
          {currentTab === 'beeps' && (
            <div className={styles.headerTabUnderline} />
          )}
        </div>
      </Link>
      <Link
        href={pathname + '/with_replies'}
        replace={true}
        onClick={() => setCurrentTab('with_replies')}
        className={styles.headerTab}
      >
        <div
          className={`${styles.headerTabContent} ${
            currentTab === 'with_replies' ? styles.headerTabActive : ''
          }`}
        >
          <span className={styles.headerTabSpan}>Beeps & replies</span>
          {currentTab === 'with_replies' && (
            <div className={styles.headerTabUnderline} />
          )}
        </div>
      </Link>
      <Link
        href={pathname + '/media'}
        replace={true}
        onClick={() => setCurrentTab('media')}
        className={styles.headerTab}
      >
        <div
          className={`${styles.headerTabContent} ${
            currentTab === 'media' ? styles.headerTabActive : ''
          }`}
        >
          <span className={styles.headerTabSpan}>Media</span>
          {currentTab === 'media' && (
            <div className={styles.headerTabUnderline} />
          )}
        </div>
      </Link>
      <Link
        href={pathname + '/likes'}
        replace={true}
        onClick={() => setCurrentTab('likes')}
        className={styles.headerTab}
      >
        <div
          className={`${styles.headerTabContent} ${
            currentTab === 'likes' ? styles.headerTabActive : ''
          }`}
        >
          <span className={styles.headerTabSpan}>Likes</span>
          {currentTab === 'likes' && (
            <div className={styles.headerTabUnderline} />
          )}
        </div>
      </Link>
    </div>
  )
}
