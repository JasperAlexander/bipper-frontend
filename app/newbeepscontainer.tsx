import styles from './newbeepscontainer.module.css'
import { Dispatch, SetStateAction } from 'react'

export default function NewBeepsContainer({
  beepsAvailable,
  setBeepsAvailable,
  refetch,
}: {
  beepsAvailable: number
  setBeepsAvailable: Dispatch<SetStateAction<number>>
  refetch: () => void
}) {
  return (
    <button
      className={styles.newBeepsButton}
      onClick={() => {
        setBeepsAvailable(0)
        refetch()
      }}
    >
      <span className={styles.newBeepsText}>
        {beepsAvailable > 1
          ? `Show ${beepsAvailable} Beep`
          : `Show ${beepsAvailable} Beeps`}
      </span>
    </button>
  )
}
