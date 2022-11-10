import { useCallback } from "react";
import { useQuery } from "react-query";
import { getSavedAlbums, SavedAlbums } from "src/api-services";
import { useTokenRefresh } from "src/hooks";
import { SelectorState, SortOption } from "src/hooks/useSelectorState";
import { useHydration, useStore } from "src/store";

const ALBUM_INTERVAL = 24;

const sortAlbums = (
  sortOption: SortOption,
  savedAlbumA: SpotifyApi.SavedAlbumObject,
  savedAlbumB: SpotifyApi.SavedAlbumObject
) => {
  switch (sortOption) {
    case SortOption.ASCENDING_ADD_DATE:
      return (
        new Date(savedAlbumA.added_at).getTime() -
        new Date(savedAlbumB.added_at).getTime()
      );
    case SortOption.DESCENDING_ADD_DATE:
      return (
        new Date(savedAlbumB.added_at).getTime() -
        new Date(savedAlbumA.added_at).getTime()
      );
    case SortOption.ASCENDING_RELEASE_DATE:
      return (
        new Date(savedAlbumA.album.release_date).getTime() -
        new Date(savedAlbumB.album.release_date).getTime()
      );
    case SortOption.DESCENDING_RELEASE_DATE:
      return (
        new Date(savedAlbumB.album.release_date).getTime() -
        new Date(savedAlbumA.album.release_date).getTime()
      );
    case SortOption.ASCENDING_ALBUM:
      return savedAlbumA.album.name.localeCompare(savedAlbumB.album.name);
    case SortOption.DESCENDING_ALBUM:
      return savedAlbumB.album.name.localeCompare(savedAlbumA.album.name);
    case SortOption.ASCENDING_ARTIST:
      return savedAlbumA.album.name.localeCompare(savedAlbumB.album.name);
    case SortOption.DESCENDING_ARTIST:
      return savedAlbumB.album.artists[0].name.localeCompare(
        savedAlbumA.album.artists[0].name
      );
    case SortOption.POPULARITY:
      return savedAlbumB.album.popularity - savedAlbumA.album.popularity;
    default:
      return 0;
  }
};

export const useSavedAlbumsQuery = (state: SelectorState) => {
  const isHydrated = useHydration();
  const accessToken = useStore((store) => store.tokens.access);
  const { searchQuery, sortOption } = state;

  useTokenRefresh();
  const selectAlbumsFromQuery = useCallback(
    (data: SavedAlbums | undefined): SavedAlbums | undefined => {
      if (!data) {
        return undefined;
      }
      const sortType =
        sortOption === ""
          ? searchQuery === ""
            ? SortOption.DESCENDING_ADD_DATE
            : SortOption.POPULARITY
          : sortOption;
      const albums = (
        searchQuery === ""
          ? data.items
          : (data.albumDictionary.search(
              searchQuery
            ) as SpotifyApi.SavedAlbumObject[])
      ).sort((a, b) => sortAlbums(sortType, a, b));

      return { ...data, items: albums };
    },
    [searchQuery, sortOption]
  );

  return useQuery<
    SpotifyApi.PagingObject<SpotifyApi.SavedAlbumObject> | undefined
  >(
    ["saved-albums", isHydrated, accessToken],
    useCallback(async () => {
      if (!isHydrated || !accessToken) {
        return undefined;
      }
      try {
        const response = await getSavedAlbums(accessToken);
        console.log("running query function");
        return response.data;
      } catch (error) {
        return Promise.reject(error);
      }
    }, [isHydrated, accessToken]),
    {
      select: selectAlbumsFromQuery,
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
};
