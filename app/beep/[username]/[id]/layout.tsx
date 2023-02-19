import NavHeader from '@/app/navheader'
import styles from '@/app/beep/[username]/[id]/page.module.css'
import { Fragment, ReactNode } from 'react'
import HeaderContent from '@/app/headercontent'

export default function BeepLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { [key: string]: string | string[] | undefined }
}) {
  return (
    <Fragment>
      <NavHeader />
      <div className={styles.primaryColumn}>
        <div className={styles.primaryColumnHeader}>
          <HeaderContent params={params} />
        </div>
        <div>{children}</div>
      </div>
      <div className={styles.secondaryColumn}>
        <div>Trends</div>
      </div>
    </Fragment>
  )
}
