import SyncResultsButtons from '@/components/SyncResultsButtons'
import SyncStatus from '@/components/SyncStatus'
import { Container } from '@mui/material'

/**
 * The page where we submit the sync request and display the results.
 */
export default function SyncResults () {
  return (
    <Container
      sx={{
        maxWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: '30px',
        padding: '20px'
      }}
    >
      <SyncStatus />
      <SyncResultsButtons />
    </Container>
  )
}
