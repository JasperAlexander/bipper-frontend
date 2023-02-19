import styles from '@/app/settings/layout.module.css'
import HeaderContent from '@/app/headercontent'
import { Fragment, ReactNode } from 'react'
import NavHeader from '@/app/navheader'

export default async function SettingsLayout({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <Fragment>
      <NavHeader />
      <div className={styles.primaryColumn}>
        <div className={styles.primaryColumnHeader}>
          <HeaderContent href={href} />
        </div>
        <div>
          <span>settings options</span>
        </div>
      </div>
      <div className={styles.secondaryColumn}>{children}</div>
    </Fragment>
  )
}
