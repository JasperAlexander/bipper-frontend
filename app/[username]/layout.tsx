'use client'

import styles from '@/app/[username]/page.module.css'
import HeaderContent from '@/app/headercontent'
import { Fragment, ReactNode, useEffect } from 'react'
import NavHeader from '@/app/navheader'
import SearchBar from '@/app/searchbar'
import Link from 'next/link'
import ProfileTabs from './profiletabs'
import { getUserByUsername } from '@/utils/queries'
import { userType } from '@/types/userTypes'
import { useQuery } from '@apollo/client'

export default function ProfileLayout({
  params,
  children,
}: {
  params: { [key: string]: string | string[] | undefined }
  children: ReactNode
}) {
  const username = params.username
  const { data, loading, error, startPolling } = useQuery(getUserByUsername, {
    variables: {
      username,
    },
  })
  const user: userType | undefined = data?.getUserByUsername

  useEffect(() => {
    startPolling(30000)
  }, [startPolling])

  return (
    <Fragment>
      <NavHeader />
      <div className={styles.primaryColumn}>
        <div className={styles.primaryColumnHeader}>
          {/* HeaderContent needs nrOfBeeps */}
          <HeaderContent params={params} />
        </div>
        <div className={styles.bannerContainer}>
          {user?.bannerImg && (
            <img src={user.bannerImg} draggable className={styles.banner} />
          )}
        </div>
        <div className={styles.profileContent}>
          <div className={styles.profileContentTop}>
            <div className={styles.avatarContainer}>
              <img
                src={
                  user?.profileImg
                    ? user.profileImg
                    : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png'
                }
                draggable={true}
                className={styles.avatar}
              />
            </div>
            <div className={styles.profileButtons}>
              <button type='button' className={styles.profileSvgButton}>
                <svg viewBox='0 0 24 24' aria-hidden='true'>
                  <g>
                    <path d='M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z'></path>
                  </g>
                </svg>
              </button>
              <button type='button' className={styles.profileSvgButton}>
                <svg viewBox='0 0 24 24' aria-hidden='true'>
                  <g>
                    <path d='M22 5v2h-3v3h-2V7h-3V5h3V2h2v3h3zm-.86 13h-4.241c-.464 2.281-2.482 4-4.899 4s-4.435-1.719-4.899-4H2.87L4 9.05C4.51 5.02 7.93 2 12 2v2C8.94 4 6.36 6.27 5.98 9.3L5.13 16h13.73l-.38-3h2.02l.64 5zm-6.323 0H9.183c.412 1.164 1.51 2 2.817 2s2.405-.836 2.817-2z'></path>
                  </g>
                </svg>
              </button>
              <button type='button' className={styles.followButton}>
                <span className={styles.followButtonSpan}>Following</span>
              </button>
            </div>
          </div>
          <div className={styles.userNames}>
            <div className={styles.userName}>
              <span className={styles.userNameSpan}>{user?.name}</span>
              {user?.config === 'verified' && (
                <svg
                  className={styles.userVerifiedSvg}
                  viewBox='0 0 24 24'
                  aria-label='Verified account'
                  role='img'
                  data-testid='icon-verified'
                >
                  <g>
                    <path d='M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z'></path>
                  </g>
                </svg>
              )}
            </div>
            <span className={styles.userUsername}>@{username}</span>
          </div>
          {user?.description && (
            <div className={styles.userDescription}>
              <span>{user.description}</span>
            </div>
          )}
          <div className={styles.userInfo}>
            {user?.location && (
              <div className={styles.userInfoItem}>
                <svg
                  className={styles.userInfoItemSvg}
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <g>
                    <path d='M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z'></path>
                  </g>
                </svg>
                <span className={styles.userInfoItemSpan}>{user.location}</span>
              </div>
            )}
            {user?.url && (
              <div className={styles.userInfoItem}>
                <svg
                  className={styles.userInfoItemSvg}
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <g>
                    <path d='M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z'></path>
                  </g>
                </svg>
                <Link href={user.url} className={styles.userInfoItemLink}>
                  {/* Does url contain text and url? */}
                  gatesnot.es/blog
                </Link>
              </div>
            )}
            {user?.createdAt && (
              <div className={styles.userInfoItem}>
                <svg
                  className={styles.userInfoItemSvg}
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <g>
                    <path d='M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z'></path>
                  </g>
                </svg>
                <span className={styles.userInfoItemSpan}>
                  Joined{' '}
                  {new Intl.DateTimeFormat('en-US', {
                    month: 'long',
                    year: 'numeric',
                  }).format(new Date(user.createdAt))}
                </span>
              </div>
            )}
          </div>
          <div className={styles.userFollowing}>
            <Link href='/' className={styles.userFollowingItem}>
              <span className={styles.userFollowingItemCounter}>536</span>
              <span className={styles.userFollowingItemText}> Following</span>
            </Link>
            <Link href='/' className={styles.userFollowingItem}>
              <span className={styles.userFollowingItemCounter}>61.9M</span>
              <span className={styles.userFollowingItemText}> Followers</span>
            </Link>
          </div>
        </div>
        <ProfileTabs />
        {children}
      </div>
      <div className={styles.secondaryColumn}>
        <div className={styles.searchBarContainer}>
          <SearchBar />
        </div>
      </div>
    </Fragment>
  )
}
