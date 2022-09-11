import { useCallback, useEffect, useState } from "react";
import { Button, Container, Typography, LinearProgress, Fab } from "@mui/material"
import { useStore, useHydration } from "../store";
import { FilterAlbumsForm, FormState, SortOption } from "./FilterAlbumsForm";
import { AlbumGrid } from "./AlbumGrid";
import { Link } from "react-router-dom";
import { useSavedAlbumsQuery } from "../hooks/query-hooks";

const ALBUM_INTERVAL = 24

export const AlbumSelection = () => {
  const isHydrated = useHydration()
  const selectAllAlbums = useStore((store) => store.selectAllAlbums)
  const [formValues, setFormValues] = useState<FormState>({searchQuery: '', sortOption: SortOption.DESCENDING_ADD_DATE})
  const [currentAlbums, setCurrentAlbums] = useState<SpotifyApi.SavedAlbumObject[]>([])
  const [canLoadMore, setLoadMore] = useState(false)

  const {searchQuery, sortOption} = formValues

  const {data, isLoading, isFetching, isFetched, isError, isPreviousData} = useSavedAlbumsQuery(formValues)

  useEffect(() => {
    if (data) {
      setCurrentAlbums(data.items.slice(0, ALBUM_INTERVAL))
    }
  }, [data])

  useEffect(() => {
    if ((isLoading || isFetching) && searchQuery) {
      setCurrentAlbums([])
    }
  }, [isLoading, isFetching, searchQuery])

  useEffect(() => {
    if (data && currentAlbums.length < data.items.length) {
      setLoadMore(true)
    } else {
      setLoadMore(false)
    }
  }, [data, currentAlbums])

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          window.scrollTo({top: 0, behavior: 'smooth'}) 
        }, 20)
      })
    })
  }, [searchQuery])

  const loadMoreAlbums = useCallback(() => {
    if (data) {
      setCurrentAlbums((albums => {
        if (albums.length + ALBUM_INTERVAL <= data.items.length) {
          return data.items.slice(0, albums.length + ALBUM_INTERVAL)
        } else {
          return data.items
        }
      }))
    }
  }, [setCurrentAlbums, data])
  
  const handleSelectAll = useCallback(() => {
    if (isHydrated) {
      selectAllAlbums(currentAlbums.map(({album}) => album))
    }
  }, [currentAlbums, isHydrated])

  return isHydrated ? (
    <Container sx={{maxWidth: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems:'center', gap: '30px'}}>
      <Typography variant="h1">Select Albums to Add</Typography>
      <Typography variant="caption">
        This will add all songs from your current saved albums into your "Liked
        Songs" playlist.
      </Typography>
      <FilterAlbumsForm formState={[formValues, setFormValues]} handleSelectAll={handleSelectAll} />
      {isFetched && <AlbumGrid {...{currentAlbums}} />}
      {(isLoading || isFetching) && <LinearProgress sx={{height: 10, width: '100%', marginTop: 20}} />}
      {canLoadMore && <Button variant="contained" onClick={loadMoreAlbums}>Show More</Button>}
      <Fab color="secondary" size="large" 
        sx={{position: 'sticky', bottom: '48px', marginRight: '80%', height: "64px", fontSize: '1rem'}} 
        component={Link} to="/" variant="extended">Go Back</Fab>
      <Fab color="primary" size="large" 
        sx={{position: 'sticky', bottom: '48px', marginLeft: '80%', height: "64px", fontSize: '1rem'}} 
        component={Link} to="/sync" variant="extended">Continue</Fab>
    </Container>
  ) : null;
};
