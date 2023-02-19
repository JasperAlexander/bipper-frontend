'use client' // Error components must be client components

import styles from '@/app/beep/[username]/[id]/page.module.css'

export default function BeepError({ error }: { error: Error }) {
  return (
    <div className={styles.beepNotAvailable}>
      <span>Oops.. {error.message}</span>
    </div>
  )
}
