'use client'

import { Button, LinearProgress } from '@mui/material'
import { useSyncRequest } from '@/hooks/useSyncRequest'
import { useRouter } from 'next/navigation'

/**
 * The page where we submit the sync request and display the results.
 */
export default function SyncStatus () {
  const router = useRouter()
  const { status, progress, refetch } = useSyncRequest()

  return (
    <>
      {status}
      {status === 'loading' && (
        <LinearProgress
          sx={{ height: 10, width: '100%', marginTop: 20 }}
          variant='determinate'
          value={progress * 100}
        />
      )}

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
