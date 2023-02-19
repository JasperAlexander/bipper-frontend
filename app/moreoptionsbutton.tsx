import styles from '@/app/buttons.module.css'

export default function MoreOptionsButton() {
  return (
    <button type='button' className={styles.moreOptionsButton}>
      <svg
        viewBox='0 0 24 24'
        aria-hidden='true'
        className={styles.moreOptionsButtonSvg}
      >
        <g>
          <path d='M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z'></path>
        </g>
      </svg>
    </button>
  )
}
