import { useSession } from 'next-auth/react'
import logo from '../../../assets/logo.svg'
import { Button, Container, Typography, styled } from '@mui/material'
import Link from 'next/link'

export default function Home () {
  return (
    <main>
      <Container
        sx={{
          height: '100%',
          minHeight: '600px',
          maxWidth: '100vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          gap: '30px'
        }}
      >
        <img
          src={
            'https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-download-logo-30.png'
          }
          width='100'
          height='100'
          alt=''
        />
        <Typography align='center' variant='h1'>
          Spotify Sync ⌰
        </Typography>
        <Typography
          variant='body1'
          sx={{ padding: '.25rem', maxWidth: '540px', textAlign: 'center' }}
        >
          Sync your Spotify "Saved Albums" and "Liked Songs". Sync all albums or
          just a few.
        </Typography>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <Button
            variant='contained'
            size='large'
            component={Link}
            href='/select-albums'
            sx={{
              width: '100%',
              maxWidth: 320
            }}
          >
            Select Albums to Sync
          </Button>
          <Button
            variant='contained'
            size='large'
            sx={{
              width: '100%',
              maxWidth: 320
            }}
          >
            Sync All Albums
          </Button>
        </Container>
      </Container>
    </main>
  )
}
