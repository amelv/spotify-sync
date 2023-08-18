import { Button, Container, Link, Typography } from '@mui/material'

import SpotifyIcon from '../../../../assets/spotify.png'
import { signIn } from 'next-auth/react'

/**
 * The login page. Authenticates the user with Spotify.
 *
 * @returns
 */
export const SignIn = () => {
  return (
    <Container
      sx={{
        maxWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: '30px'
      }}
    >
      <Typography variant='h1' sx={{ fontSize: '2.5rem' }}>
        Spotify Albums to Songs Sync
      </Typography>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          width: '300px',
          height: '300px',
          backgroundColor: 'black',
          borderRadius: '12px',
          padding: '20px'
        }}
      >
        <img
          src={
            'https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-download-logo-30.png'
          }
          height='100px'
          width='100px'
          alt=''
        />
        <Typography
          sx={{ color: 'white', textAlign: 'center' }}
          variant='body2'
        >
          Please log in to your Spotify account.
        </Typography>
        <Button
          variant='contained'
          component={Link}
          onClick={() => signIn('spotify')}
        >
          Login into spotify.
        </Button>
      </div>
    </Container>
  )
}
