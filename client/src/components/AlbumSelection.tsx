import { useCallback, useState } from "react";
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
  const [formValues, setFormValues] = useState<FormState>({searchQuery: '', sortOption: SortOption.DESCENDING_ADD_DATE, albumGridSize: ALBUM_INTERVAL})

  const {searchQuery, albumGridSize} = formValues

  const {data, isLoading, isFetching} = useSavedAlbumsQuery(formValues)

  const currentAlbums = data?.items.slice(0, albumGridSize) ?? []
  const canLoadMore = albumGridSize < (data?.items.length ?? ALBUM_INTERVAL)

  const loadMoreAlbums = useCallback(() => {
    const totalAlbumQuerySize = data?.items.length
    if (totalAlbumQuerySize) {
      setFormValues(({albumGridSize, ...values}) => {
        const albumsRemaining = totalAlbumQuerySize - albumGridSize
        return {...values, albumGridSize: albumsRemaining < ALBUM_INTERVAL ? albumGridSize + albumsRemaining : albumGridSize + ALBUM_INTERVAL}
      })
    }
  }, [data?.items.length])
  
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
      {(isLoading || isFetching) && searchQuery ? null : <AlbumGrid {...{currentAlbums}} />}
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
