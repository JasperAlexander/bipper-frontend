import styles from '@/app/buttons.module.css'

export default function BeepAnalyticsButton({
  nrOfImpressions,
}: {
  nrOfImpressions?: number
}) {
  return (
    <button type='button' className={styles.beepAnalyticsButton}>
      <div className={styles.beepAnalyticsButtonSvgContainer}>
        <svg
          viewBox='0 0 24 24'
          aria-hidden='true'
          className={styles.beepAnalyticsButtonSvg}
        >
          <g>
            <path d='M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z'></path>
          </g>
        </svg>
      </div>
      <span className={styles.beepAnalyticsButtonSpan}>{nrOfImpressions}</span>
    </button>
  )
}
