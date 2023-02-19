'use client'

import styles from '@/app/headercontent.module.css'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Fragment } from 'react'
import HeaderTabs from '@/app/headertabs'
import MoreOptionsButton from '@/app/moreoptionsbutton'
import SearchBar from '@/app/searchbar'
import LogoSVG from './logosvg'

export default function HeaderContent({
  href,
  params,
  nrOfBeeps,
}: {
  href?: string
  params?: { [key: string]: string | string[] | undefined }
  nrOfBeeps?: number
}) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className={styles.headerContent}>
      {(pathname === '/' || pathname === '/search') && (
        <div className={styles.headerTop}>
          <Link href='/'>
            <LogoSVG />
          </Link>
          <SearchBar />
          <MoreOptionsButton />
        </div>
      )}
      {pathname === '/home' && (
        <Fragment>
          <div className={styles.headerTop}>
            <h2 className={styles.headerTitle}>Home</h2>
            <div className={styles.headerAvatar} />
            <LogoSVG className={styles.headerLogo} />
            <div />
          </div>
          <HeaderTabs />
        </Fragment>
      )}
      {pathname === '/settings' && (
        <h2 className={styles.headerTitle}>Settings</h2>
      )}
      {pathname === `/${params?.username}` && (
        <div className={styles.headerTop}>
          <button
            type='button'
            className={styles.headerButton}
            onClick={() => router.back()}
          >
            <svg viewBox='0 0 24 24' aria-hidden='true'>
              <g>
                <path d='M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z'></path>
              </g>
            </svg>
          </button>
          <div className={styles.headerUserNames}>
            <h2 className={styles.headerTitle}>{params!.username}</h2>
            {/* nrOfBeep should be shortened */}
            <span className={styles.headerSubTitle}>{nrOfBeeps} Beeps</span>
          </div>
          <div className={styles.empty} />
        </div>
      )}
      {pathname === `/beep/${params?.username}/${params?.id}` && (
        <div className={styles.headerTop}>
          <button
            type='button'
            className={styles.headerButton}
            onClick={() => router.back()}
          >
            <svg viewBox='0 0 24 24' aria-hidden='true'>
              <g>
                <path d='M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z'></path>
              </g>
            </svg>
          </button>
          <h2 className={styles.headerTitle}>Beep</h2>
          <div className={styles.empty} />
        </div>
      )}
    </div>
  )
}
