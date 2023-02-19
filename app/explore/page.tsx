import styles from '@/app/explore/page.module.css'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation'
import SignInContainer from '@/app/signincontainer'
import Feed from '@/app/feed'
import HeaderContent from '@/app/headercontent'
import { Fragment } from 'react'
import NavHeader from '@/app/navheader'

export default async function ExplorePage({ href }: { href: string }) {
  const session = await getServerSession(authOptions)
  if (session) redirect('/home')

  return (
    <Fragment>
      <NavHeader />
      <div className={styles.primaryColumn}>
        <div className={styles.primaryColumnHeader}>
          <HeaderContent href={href} />
        </div>
        <div>
          <Feed />
        </div>
      </div>
      <div className={styles.secondaryColumn}>
        <SignInContainer />
      </div>
    </Fragment>
  )
}
