'use client'

import { Button, LinearProgress } from '@mui/material'
import { useCallback, useMemo } from 'react'
import { AlbumGrid } from '@/components/AlbumGrid'
import { FilterAlbumsForm } from '@/components/FilterAlbumsForm'
import { useSavedAlbumsQuery } from '@/hooks/queryHooks'
import {  useStore } from '@/store'
import { getSavedAlbums } from '@/api-services'

const ALBUM_INTERVAL = 24
/**
 * The component where we select the albums to sync. Displays a list of albums
 * and a form to filter them.
 * @returns
 */
export const AlbumSelector = () => {
  const dispatch = useStore(store => store.dispatchAlbumSelectionAction)
  const albumGridSize = useStore(store => store.albumGridSize)

  const { data, isLoading, isFetching } = useSavedAlbumsQuery()

  const totalAlbums = useMemo(() => data?.items.length, [data?.items.length])
  const currentAlbums = useMemo(
    () => data?.items.slice(0, albumGridSize) ?? [],
    [data, albumGridSize]
  )
  const canLoadMore = useMemo(
    () => albumGridSize < (totalAlbums ?? ALBUM_INTERVAL),
    [totalAlbums, albumGridSize]
  )

  const loadMoreAlbums = useCallback(() => {
    if (totalAlbums) {
      dispatch({ type: 'increment-grid-size', payload: totalAlbums })
    }
  }, [totalAlbums, dispatch])

  const handleSelectAll = useCallback(() => {
      dispatch({
        type: 'select-all',
        payload: currentAlbums.map(({ album }) => album)
      })
    
  }, [currentAlbums,  dispatch])

  return (
    <>
      <FilterAlbumsForm handleSelectAll={handleSelectAll} />
      {isLoading || isFetching ? null : <AlbumGrid {...{ currentAlbums }} />}
      {(isLoading || isFetching) && (
        <LinearProgress sx={{ height: 10, width: '100%', marginTop: 20 }} />
      )}
      {canLoadMore && (
        <Button variant='contained' onClick={loadMoreAlbums}>
          Show More
        </Button>
      )}
    </>
  )
}
