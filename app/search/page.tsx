import styles from '@/app/search/page.module.css'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import SignInContainer from '@/app/signincontainer'
import Feed from '@/app/feed'
import HeaderContent from '@/app/headercontent'
import { Fragment } from 'react'
import NavHeader from '@/app/navheader'

export default async function SearchPage({ href }: { href: string }) {
  const session = await getServerSession(authOptions)

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
