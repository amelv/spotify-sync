'use client'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fade,
  Typography
} from '@mui/material'
import { FastAverageColor } from 'fast-average-color'
import { memo } from 'react'
import { useQuery } from 'react-query'
import { useHydration, useStore } from '@/store'
import shallow from 'zustand/shallow'

interface AlbumCardProps {
  album: SpotifyApi.AlbumObjectFull
}

/**
 * A card that displays an album. The card is highlighted if the album is selected.
 * @prop album - The album to display.
 */
export const AlbumCard = memo(
  ({ album }: AlbumCardProps) => {
    const image = album.images[0]

    const { data: bgColor } = useQuery([album.id, image.url], {
      queryFn: async () => {
        const averageColorCalcuator = new FastAverageColor()
        if (image.url) {
          try {
            return await averageColorCalcuator.getColorAsync(image.url)
          } catch (error) {
            console.error(error)
            return undefined
          }
        }
        return undefined
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      cacheTime: Infinity
    })
    console.log(bgColor)
    const [isSelected, dispatchAlbumSelectionAction] = useStore(
      store => [
        !!store.selectedAlbums.get(album.id),
        store.dispatchAlbumSelectionAction
      ],
      shallow
    )
    const isHydrated = useHydration()
    const handleToggle = () => {
      dispatchAlbumSelectionAction({
        type: isSelected ? 'remove' : 'select',
        payload: album
      })
    }

    return (
      <Card
        raised={!isSelected}
        sx={theme => ({
          width: '100%',
          height: '100%',
          maxHeight: 400,
          outline: isSelected
            ? `5px solid ${theme.palette.primary.main}`
            : 'none',
          boxShadow: isSelected
            ? 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset'
            : undefined,
          transition:
            'outline 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease',
          positon: 'relative',
          borderRadius: '6px',
          opacity: !!bgColor ? 1 : 0
        })}
      >
        <CardActionArea
          sx={theme => ({
            '& span.MuiCardActionArea-focusHighlight': {
              opacity: isSelected
                ? theme.palette.action.selectedOpacity
                : undefined,
              backgroundColor: isSelected
                ? theme.palette.primary.main
                : undefined
            },
            '&:hover span.MuiCardActionArea-focusHighlight': {
              opacity: isSelected
                ? theme.palette.action.selectedOpacity * 1.5
                : undefined,
              backgroundColor: isSelected
                ? theme.palette.primary.main
                : undefined
            },
            '&.Mui-focusVisible span.MuiCardActionArea-focusHighlight': {
              opacity: isSelected
                ? theme.palette.action.selectedOpacity * 1.5
                : undefined,
              backgroundColor: isSelected
                ? theme.palette.primary.main
                : undefined
            },
            '&:focused': {
              backgroundColor: '282828'
            },
            height: 372,
            position: 'relative'
          })}
          disabled={!isHydrated}
          onClick={handleToggle}
        >
          <Fade
            appear
            mountOnEnter
            unmountOnExit
            in={isSelected}
            timeout={{ enter: 300, exit: 100 }}
          >
            <CheckCircleIcon
              sx={theme => ({
                position: 'absolute',
                width: 120,
                height: 120,
                zIndex: 1,
                color: theme.palette.secondary.main,
                margin: 'auto',
                left: 0,
                right: 0,
                bottom: 120,
                top: 0
              })}
            />
          </Fade>
          <CardMedia
            sx={{ zIndex: 0, position: 'relative' }}
            id='album-image'
            component='img'
            crossOrigin='anonymous'
            height={240}
            image={image.url}
            alt=''
          />
          <CardContent
            sx={{
              height: '100%',
              background: !!bgColor
                ? `linear-gradient(${bgColor?.rgb}, #121212);`
                : undefined
            }}
          >
            <Typography
              gutterBottom
              variant='h5'
              component='div'
              color={bgColor?.isLight ? '#121212' : undefined}
            >
              {album.name}
            </Typography>
            <Typography
              variant='body2'
              color={bgColor?.isLight ? '#181818' : 'text.secondary'}
            >
              {album.artists.map(artist => artist.name).join(', ')}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  },
  (prevProps, nextProps) => prevProps.album.id === nextProps.album.id
)
