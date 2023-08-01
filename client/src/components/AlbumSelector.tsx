import { Button, LinearProgress } from "@mui/material";
import { useCallback, useMemo } from "react";
import { AlbumGrid } from "src/components/AlbumGrid";
import { FilterAlbumsForm } from "src/components/FilterAlbumsForm";
import { useSavedAlbumsQuery } from "src/hooks/queryHooks";
import { useHydration, useStore } from "src/store";

const ALBUM_INTERVAL = 24;

/**
 * The component where we select the albums to sync. Displays a list of albums
 * and a form to filter them.
 * @returns 
 */
export const AlbumSelector = () => {
  const isHydrated = useHydration();
  const dispatch = useStore((store) => store.dispatchAlbumSelectionAction);
  const albumGridSize = useStore((store) => store.albumGridSize);

  const { data, isLoading, isFetching } = useSavedAlbumsQuery();

  const totalAlbums = useMemo(() => data?.items.length, [data?.items.length]);
  const currentAlbums = useMemo(
    () => data?.items.slice(0, albumGridSize) ?? [],
    [data, albumGridSize]
  );
  const canLoadMore = useMemo(
    () => albumGridSize < (totalAlbums ?? ALBUM_INTERVAL),
    [totalAlbums, albumGridSize]
  );

  const loadMoreAlbums = useCallback(() => {
    if (totalAlbums) {
      dispatch({ type: "increment-grid-size", payload: totalAlbums });
    }
  }, [totalAlbums, dispatch]);

  const handleSelectAll = useCallback(() => {
    if (isHydrated) {
      dispatch({
        type: "select-all",
        payload: currentAlbums.map(({ album }) => album),
      });
    }
  }, [currentAlbums, isHydrated, dispatch]);

  return isHydrated ? (
    <>
      <FilterAlbumsForm handleSelectAll={handleSelectAll} />
      {isLoading || isFetching ? null : <AlbumGrid {...{ currentAlbums }} />}
      {(isLoading || isFetching) && (
        <LinearProgress sx={{ height: 10, width: "100%", marginTop: 20 }} />
      )}
      {canLoadMore && (
        <Button variant="contained" onClick={loadMoreAlbums}>
          Show More
        </Button>
      )}
    </>
  ) : null;
};
