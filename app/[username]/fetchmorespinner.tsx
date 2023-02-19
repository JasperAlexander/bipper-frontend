'use client'

import styles from '@/app/[username]/page.module.css'
import Spinner from '@/app/spinner'
import { useEffect, useRef } from 'react'

export default function FetchMoreSpinner({
  fetchMore,
  after,
}: {
  fetchMore: any
  after: string
}) {
  const spinnerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (spinnerRef.current) {
      const observer = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            console.log('intersect')
            fetchMore({
              variables: { after },
              updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
                console.log('previousResult: ', previousResult)
                console.log('fetchMoreResult: ', fetchMoreResult)
              },
            })
          }
        },
        { threshold: [1] }
      )
      observer.observe(spinnerRef.current)

      return () => observer.disconnect()
    }
  })

  return (
    <div className={styles.beepsNotAvailable} ref={spinnerRef}>
      <Spinner />
    </div>
  )
}
