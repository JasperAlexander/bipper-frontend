import styles from '@/app/beep/[username]/[id]/page.module.css'
import Spinner from '@/app/spinner'

export default function BeepLoading() {
  return (
    <div className={styles.beepNotAvailable}>
      <Spinner />
    </div>
  )
}
