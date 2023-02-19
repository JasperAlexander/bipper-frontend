import styles from '@/app/home/page.module.css'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation'
import Feed from '@/app/feed'
import HeaderContent from '@/app/headercontent'
import { Fragment } from 'react'
import NavHeader from '@/app/navheader'
import SearchBar from '@/app/searchbar'
import CreateBeep from '@/app/home/createbeep'

export default async function HomePage({ href }: { href: string }) {
  const session = await getServerSession(authOptions)
  // Commented for testing
  // if (!session) redirect('/')

  return (
    <Fragment>
      <NavHeader />
      <div className={styles.primaryColumn}>
        <div className={styles.primaryColumnHeader}>
          <HeaderContent href={href} />
        </div>
        <div>
          <CreateBeep />
          <Feed />
        </div>
      </div>
      <div className={styles.secondaryColumn}>
        <div className={styles.searchBarContainer}>
          <SearchBar />
        </div>
      </div>
    </Fragment>
  )
}
