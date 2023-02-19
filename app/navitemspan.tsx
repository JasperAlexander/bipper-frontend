'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import styles from './navitemspan.module.css'

export default function NavItemSpan({
  children,
  pathname,
}: {
  children: ReactNode
  pathname: string
}) {
  const currentPathname = usePathname()

  return (
    <span
      className={
        currentPathname === pathname
          ? styles.mainHeaderItemSpanActive
          : styles.mainHeaderItemSpanInactive
      }
    >
      {children}
    </span>
  )
}
