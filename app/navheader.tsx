'use client' // To do: find out why this cannot be a server component

import Link from 'next/link'
import styles from './navheader.module.css'
import NavItemSpan from './navitemspan'
import MoreOptionsButton from './moreoptionsbutton'
import LogoSVG from './logosvg'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/pages/api/auth/[...nextauth]'
// import { use } from 'react'
import { useSession } from 'next-auth/react'

// async function getSession() {
//   const session = await getServerSession(authOptions)
//   return session
// }

export default function NavHeader() {
  // const session = use(getSession())
  // const user = session?.user
  const session = useSession()
  const user = session?.data?.user

  return (
    <div className={styles.mainHeader}>
      <div className={styles.mainHeaderContent}>
        <div className={styles.mainHeaderContentTop}>
          <Link href='/' className={styles.mainHeaderLogo}>
            <LogoSVG className={styles.mainHeaderItemSvg} />
          </Link>
          {user && (
            <Link href='/home' className={styles.mainHeaderItem}>
              <svg
                viewBox='0 0 24 24'
                aria-hidden='true'
                className={styles.mainHeaderItemSvg}
              >
                <g>
                  <path d='M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z'></path>
                </g>
              </svg>
              <NavItemSpan pathname='/home'>Home</NavItemSpan>
            </Link>
          )}
          <Link href='/explore' className={styles.mainHeaderItem}>
            <svg
              viewBox='0 0 24 24'
              aria-hidden='true'
              className={styles.mainHeaderItemSvg}
            >
              <g>
                <path d='M10.25 4.25c-3.314 0-6 2.686-6 6s2.686 6 6 6c1.657 0 3.155-.67 4.243-1.757 1.087-1.088 1.757-2.586 1.757-4.243 0-3.314-2.686-6-6-6zm-9 6c0-4.971 4.029-9 9-9s9 4.029 9 9c0 1.943-.617 3.744-1.664 5.215l4.475 4.474-2.122 2.122-4.474-4.475c-1.471 1.047-3.272 1.664-5.215 1.664-4.971 0-9-4.029-9-9z'></path>
              </g>
            </svg>
            <NavItemSpan pathname='/explore'>Explore</NavItemSpan>
          </Link>
          {!user && (
            <Link href='/settings' className={styles.mainHeaderItem}>
              <svg
                viewBox='0 0 24 24'
                aria-hidden='true'
                className={styles.mainHeaderItemSvg}
              >
                <g>
                  <path d='M10.54 1.75h2.92l1.57 2.36c.11.17.32.25.53.21l2.53-.59 2.17 2.17-.58 2.54c-.05.2.04.41.21.53l2.36 1.57v2.92l-2.36 1.57c-.17.12-.26.33-.21.53l.58 2.54-2.17 2.17-2.53-.59c-.21-.04-.42.04-.53.21l-1.57 2.36h-2.92l-1.58-2.36c-.11-.17-.32-.25-.52-.21l-2.54.59-2.17-2.17.58-2.54c.05-.2-.03-.41-.21-.53l-2.35-1.57v-2.92L4.1 8.97c.18-.12.26-.33.21-.53L3.73 5.9 5.9 3.73l2.54.59c.2.04.41-.04.52-.21l1.58-2.36zm1.07 2l-.98 1.47C10.05 6.08 9 6.5 7.99 6.27l-1.46-.34-.6.6.33 1.46c.24 1.01-.18 2.07-1.05 2.64l-1.46.98v.78l1.46.98c.87.57 1.29 1.63 1.05 2.64l-.33 1.46.6.6 1.46-.34c1.01-.23 2.06.19 2.64 1.05l.98 1.47h.78l.97-1.47c.58-.86 1.63-1.28 2.65-1.05l1.45.34.61-.6-.34-1.46c-.23-1.01.18-2.07 1.05-2.64l1.47-.98v-.78l-1.47-.98c-.87-.57-1.28-1.63-1.05-2.64l.34-1.46-.61-.6-1.45.34c-1.02.23-2.07-.19-2.65-1.05l-.97-1.47h-.78zM12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.82 0 1.5-.67 1.5-1.5s-.68-1.5-1.5-1.5zM8.5 12c0-1.93 1.56-3.5 3.5-3.5 1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5c-1.94 0-3.5-1.57-3.5-3.5z'></path>
                </g>
              </svg>
              <NavItemSpan pathname='/settings'>Settings</NavItemSpan>
            </Link>
          )}
        </div>
        {user && (
          <div className={styles.mainHeaderContentBottom}>
            <div className={styles.mainHeaderAvatarContainer}>
              <div className={styles.mainHeaderAvatar} />
            </div>
            <div className={styles.mainHeaderUserNames}>
              <div className={styles.mainHeaderUserName}>
                <span>{user.name}</span>
                <svg
                  viewBox='0 0 24 24'
                  aria-label='Protected account'
                  role='img'
                  data-testid='icon-lock'
                >
                  <g>
                    <path d='M17.5 7H17v-.25c0-2.76-2.24-5-5-5s-5 2.24-5 5V7h-.5C5.12 7 4 8.12 4 9.5v9C4 19.88 5.12 21 6.5 21h11c1.39 0 2.5-1.12 2.5-2.5v-9C20 8.12 18.89 7 17.5 7zM13 14.73V17h-2v-2.27c-.59-.34-1-.99-1-1.73 0-1.1.9-2 2-2 1.11 0 2 .9 2 2 0 .74-.4 1.39-1 1.73zM15 7H9v-.25c0-1.66 1.35-3 3-3 1.66 0 3 1.34 3 3V7z'></path>
                  </g>
                </svg>
              </div>
              <div className={styles.mainHeaderUserUsername}>
                <span>@{user.username}</span>
              </div>
            </div>
            <div className={styles.mainHeaderUserOptions}>
              <MoreOptionsButton />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
