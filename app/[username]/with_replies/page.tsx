'use client'

import { beepEdgeType, beepType } from '@/types/beepTypes'
import {
  getAddedBeepsUpdates,
  getAllBeepsByUserUsername,
} from '@/utils/queries'
import { Fragment, useEffect, useRef, useState } from 'react'
import NewBeepsContainer from '@/app/newbeepscontainer'
import Spinner from '@/app/spinner'
import Beep from '@/app/beep'
import styles from '@/app/[username]/page.module.css'
import { useQuery, useSubscription } from '@apollo/client'

export default function ProfileWithRepliesPage({
  params,
}: {
  params: { [key: string]: string | string[] | undefined }
}) {
  const username = params.username

  const { loading, error, data, startPolling, fetchMore, refetch } = useQuery(
    getAllBeepsByUserUsername,
    {
      variables: {
        username,
        first: 5,
        after: '',
      },
    }
  )

  useEffect(() => {
    startPolling(30000)
  }, [startPolling])

  const beeps = data?.getAllBeeps?.edges.map((edge: beepEdgeType) => edge.node)
  const pageInfo = data?.getAllBeeps?.pageInfo

  const spinnerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (pageInfo && spinnerRef.current) {
      const observer = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            console.log('intersect')
            fetchMore({ variables: { after: pageInfo.endCursor } })
          }
        },
        { threshold: [1] }
      )
      observer.observe(spinnerRef.current)

      return () => observer.disconnect()
    }
  })

  const [beepsAvailable, setBeepsAvailable] = useState<number>(0)
  // Subscribe only to beeps by user
  useSubscription(getAddedBeepsUpdates, {
    onData: () => {
      setBeepsAvailable(beepsAvailable + 1)
    },
  })

  return (
    <div className={styles.beepsContainer}>
      {beepsAvailable > 0 && (
        <NewBeepsContainer
          beepsAvailable={beepsAvailable}
          setBeepsAvailable={setBeepsAvailable}
          refetch={refetch}
        />
      )}
      {beeps?.length > 0 ? (
        <Fragment>
          {beeps.map((beep: beepType) => (
            <Beep key={beep.id} beep={beep} />
          ))}
          {pageInfo?.hasNextPage && (
            <div className={styles.beepsNotAvailable} ref={spinnerRef}>
              <Spinner />
            </div>
          )}
        </Fragment>
      ) : (
        <div className={styles.beepsNotAvailable}>
          {loading && <Spinner />}
          {error && <p>Oh no... {error.message}</p>}
          {!loading && !error && <p>No beeps available</p>}
        </div>
      )}
    </div>
  )
}
