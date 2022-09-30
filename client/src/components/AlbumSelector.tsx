import { Button, Fab, LinearProgress } from "@mui/material";
import { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { AlbumGrid } from "src/components/AlbumGrid";
import { FilterAlbumsForm } from "src/components/FilterAlbumsForm";
import { useSavedAlbumsQuery } from "src/hooks/queryHooks";
import { useSelectorState } from "src/hooks/useSelectorState";
import { useHydration, useStore } from "src/store";

const ALBUM_INTERVAL = 24;

export const AlbumSelector = () => {
  const isHydrated = useHydration();
  const selectAllAlbums = useStore((store) => store.selectAllAlbums);
  const [state, dispatch] = useSelectorState();

  const { searchQuery, albumGridSize } = state;

  const { data, isLoading, isFetching } = useSavedAlbumsQuery(state);

  const totalAlbums = useMemo(() => data?.items.length, [data?.items.length]);
  const currentAlbums = data?.items.slice(0, albumGridSize) ?? [];
  const canLoadMore = useMemo(
    () => albumGridSize < (totalAlbums ?? ALBUM_INTERVAL),
    [totalAlbums, albumGridSize]
  );

  const loadMoreAlbums = useCallback(() => {
    if (totalAlbums) {
      dispatch({ type: "increment_grid_size", payload: totalAlbums });
    }
  }, [totalAlbums]);

  const handleSelectAll = useCallback(() => {
    if (isHydrated) {
      selectAllAlbums(currentAlbums.map(({ album }) => album));
    }
  }, [currentAlbums, isHydrated]);

  return isHydrated ? (
    <>
      <FilterAlbumsForm
        selectorState={[state, dispatch]}
        handleSelectAll={handleSelectAll}
      />
      {(isLoading || isFetching) && searchQuery ? null : (
        <AlbumGrid {...{ currentAlbums }} />
      )}
      {(isLoading || isFetching) && (
        <LinearProgress sx={{ height: 10, width: "100%", marginTop: 20 }} />
      )}
      {canLoadMore && (
        <Button variant="contained" onClick={loadMoreAlbums}>
          Show More
        </Button>
      )}
      <Fab
        color="secondary"
        size="large"
        sx={{
          position: "sticky",
          bottom: "48px",
          marginRight: "80%",
          height: "64px",
          fontSize: "1rem",
        }}
        component={Link}
        to="/"
        variant="extended"
      >
        Go Back
      </Fab>
      <Fab
        color="primary"
        size="large"
        sx={{
          position: "sticky",
          bottom: "48px",
          marginLeft: "80%",
          height: "64px",
          fontSize: "1rem",
        }}
        component={Link}
        to="/sync"
        variant="extended"
      >
        Continue
      </Fab>
    </>
  ) : null;
};
