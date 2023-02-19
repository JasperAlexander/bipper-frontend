import styles from '@/app/beep/[username]/[id]/page.module.css'

export default function BeepNotFound({ error }: { error: Error }) {
  return (
    <div className={styles.beepNotAvailable}>
      <span>Beep not found</span>
    </div>
  )
}
