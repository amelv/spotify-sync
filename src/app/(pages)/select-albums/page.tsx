import { Container, Fab, Typography } from '@mui/material'
import Link from 'next/link'
import { AlbumSelector } from '@/components/AlbumSelector'

/**
 * The page where the user selects which albums to add to their "Liked Songs"
 * playlist. The user can select all albums or just a few. The user can also
 * go back to the home page or continue to the next page.
 */
export default function SelectAlbums () {
  return (
    <Container
      sx={{
        maxWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: '30px',
        minHeight: '80vh'
      }}
    >
      <Typography variant='h1'>Select Albums to Add</Typography>
      <Typography variant='body1'>
        This will add all songs from your current saved albums into your "Liked
        Songs" playlist.
      </Typography>

      <AlbumSelector />

      <Container
        sx={{
          position: 'sticky',
          bottom: '48px',
          fontSize: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 2
        }}
      >
        <Fab
          color='secondary'
          size='large'
          sx={{
            height: '64px',
            fontSize: '1rem'
          }}
          component={Link}
          href='/'
          variant='extended'
        >
          Go Back
        </Fab>
        <Fab
          color='primary'
          size='large'
          sx={{
            height: '64px',
            fontSize: '1rem'
          }}
          component={Link}
          href='/sync'
          variant='extended'
        >
          Continue
        </Fab>
      </Container>
    </Container>
  )
}
