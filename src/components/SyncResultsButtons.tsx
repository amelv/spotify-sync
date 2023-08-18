'use client'

import { Button } from '@mui/material'
import { useSyncRequest } from '@/hooks/useSyncRequest'
import { useRouter } from 'next/navigation'

/**
 * The page where we submit the sync request and display the results.
 */
export default function SyncResultsButtons () {
  const router = useRouter()
  const { status, refetch } = useSyncRequest()

  return (
    <>
      <Button
        variant='contained'
        onClick={() => router.push('/')}
        disabled={status === 'loading'}
      >
        Done
      </Button>

      {status === 'error' && (
        <Button variant='contained' color='primary' onClick={() => refetch()}>
          Retry
        </Button>
      )}
    </>
  )
}
