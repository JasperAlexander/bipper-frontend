import styles from './spinner.module.css'

export default function Spinner({ id }: { id?: string }) {
  return (
    <div
      aria-valuemax={1}
      aria-valuemin={0}
      aria-label='Loading'
      role='progressbar'
      id={id}
    >
      <div className={styles.spinnerBox}>
        <svg className={styles.spinner} viewBox='0 0 32 32'>
          <circle cx='16' cy='16' r='14'></circle>
          <circle cx='16' cy='16' r='14'></circle>
        </svg>
      </div>
    </div>
  )
}
