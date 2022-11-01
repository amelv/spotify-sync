import { Button, LinearProgress } from "@mui/material";
import { useCallback, useMemo } from "react";
import { AlbumGrid } from "src/components/AlbumGrid";
import { FilterAlbumsForm } from "src/components/FilterAlbumsForm";
import { useSavedAlbumsQuery } from "src/hooks/queryHooks";
import { useSelectorState } from "src/hooks/useSelectorState";
import { useHydration, useStore } from "src/store";

const ALBUM_INTERVAL = 24;

export const AlbumSelector = () => {
  const isHydrated = useHydration();
  const dispatchAlbumSelectionAction = useStore(
    (store) => store.dispatchAlbumSelectionAction
  );
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
      dispatchAlbumSelectionAction({
        type: "select-all",
        payload: currentAlbums.map(({ album }) => album),
      });
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
    </>
  ) : null;
};
