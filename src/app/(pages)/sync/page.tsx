import { Container, Typography } from '@mui/material'
import { ConfirmationDialog } from '@/components/ConfirmationDialog'
import { SelectedAlbumsList } from '@/components/SelectedAlbumsList'

/**
 * The page where we confirm the selected albums and submit the sync request.
 */
export default function ConfirmSync () {
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
      <Typography align='center' variant='h1'>
        Add Saved Albums to "Liked Songs"
      </Typography>
      <Typography align='center' variant='body1'>
        This will add all songs from your selected saved albums into your "Liked
        Songs" playlist.
      </Typography>
      <SelectedAlbumsList />
      <ConfirmationDialog />
    </Container>
  )
}
