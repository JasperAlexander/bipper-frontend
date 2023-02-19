'use client'

import Link from 'next/link'
import { useState } from 'react'
import styles from './headertabs.module.css'

export default function HeaderTabs() {
  const [currentTab, setCurrentTab] = useState<string>('foryou')

  return (
    <div className={styles.headerBottom}>
      <Link
        href='/home'
        replace={true}
        onClick={() => setCurrentTab('foryou')}
        className={styles.headerTab}
      >
        <div
          className={`${styles.headerTabContent} ${
            currentTab === 'foryou' ? styles.headerTabActive : ''
          }`}
        >
          <span className={styles.headerTabSpan}>For you</span>
          {currentTab === 'foryou' && (
            <div className={styles.headerTabUnderline} />
          )}
        </div>
      </Link>
      <Link
        href='/home'
        replace={true}
        onClick={() => setCurrentTab('following')}
        className={styles.headerTab}
      >
        <div
          className={`${styles.headerTabContent} ${
            currentTab === 'following' ? styles.headerTabActive : ''
          }`}
        >
          <span className={styles.headerTabSpan}>Following</span>
          {currentTab === 'following' && (
            <div className={styles.headerTabUnderline} />
          )}
        </div>
      </Link>
    </div>
  )
}
