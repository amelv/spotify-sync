// app/ThemeRegistry.tsx
'use client'
import createCache from '@emotion/cache'
import { useServerInsertedHTML } from 'next/navigation'
import { CacheProvider } from '@emotion/react'
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes
} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useState } from 'react'

/**
 * The theme for the app. It is responsive, and
 * uses the Spotify green as the primary color.
 */
const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: '#1DB954'
      },
      secondary: { main: '#191414' },
      background: {
        default: 'linear-gradient(#121212, #181818)',
        paper: '#181818'
      },
      info: {
        main: '#FFFFFF'
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#B3B3B3',
        disabled: '#747474'
      },
      error: {
        main: '#ea3434'
      },
      warning: {
        main: '#ffe550'
      },
      action: {
        selectedOpacity: 0.18
      }
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Helvetica Neue"',
        'Roboto',
        'Arial'
      ].join(','),
      h1: {
        fontSize: '4rem',
        fontWeight: 500
      },
      h2: {
        fontSize: '2.75rem'
      },
      h3: {
        fontSize: '2.25rem'
      },
      h4: {
        fontSize: '2rem'
      },
      body1: {
        fontSize: '1.25rem'
      },
      body2: {
        fontSize: '1rem'
      },
      caption: {
        fontSize: '0.875rem'
      }
    }
  })
)

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeRegistry (props: { options: any; children: any }) {
  const { options, children } = props

  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options)
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: string[] = []
    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }
      return prevInsert(...args)
    }
    const flush = () => {
      const prevInserted = inserted
      inserted = []
      return prevInserted
    }
    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) {
      return null
    }
    let styles = ''
    for (const name of names) {
      styles += cache.inserted[name]
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles
        }}
      />
    )
  })

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}
