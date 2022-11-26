import { sort } from "fast-sort";
import { useCallback } from "react";
import { useQuery } from "react-query";
import { getSavedAlbums, SavedAlbums } from "src/api-services";
import { useTokenRefresh } from "src/hooks";
import { SortOption } from "src/hooks/useSelectorState";
import { useHydration, useStore } from "src/store";

const sortAlbums = (
  sortOption: SortOption,
  albums: SpotifyApi.SavedAlbumObject[]
) => {
  switch (sortOption) {
    case SortOption.ASCENDING_ADD_DATE:
      return sort(albums).asc((album) => new Date(album.added_at).getTime());
    case SortOption.DESCENDING_ADD_DATE:
      return sort(albums).desc((album) => new Date(album.added_at).getTime());
    case SortOption.ASCENDING_RELEASE_DATE:
      return sort(albums).asc(({ album }) =>
        new Date(album.release_date).getTime()
      );
    case SortOption.DESCENDING_RELEASE_DATE:
      return sort(albums).desc(({ album }) =>
        new Date(album.release_date).getTime()
      );
    case SortOption.ASCENDING_ALBUM:
      return sort(albums).asc(({ album }) => album.name.toLocaleLowerCase());
    case SortOption.DESCENDING_ALBUM:
      return sort(albums).desc(({ album }) => album.name.toLocaleLowerCase());
    case SortOption.ASCENDING_ARTIST:
      return sort(albums).asc(({ album }) =>
        album.artists
          .map(({ name }) => name)
          .join(", ")
          .toLocaleLowerCase()
      );
    case SortOption.DESCENDING_ARTIST:
      return sort(albums).desc(({ album }) =>
        album.artists
          .map(({ name }) => name)
          .join(", ")
          .toLocaleLowerCase()
      );
    case SortOption.POPULARITY:
      return sort(albums).desc(({ album }) => album.popularity);
    default:
      return [];
  }
};

export const useSavedAlbumsQuery = () => {
  const isHydrated = useHydration();
  const accessToken = useStore((store) => store.tokens.access);
  const searchQuery = useStore((store) => store.searchQuery);
  const sortOption = useStore((store) => store.sortOption);

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

      const filteredAlbums =
        searchQuery === ""
          ? data.items
          : (data.albumDictionary.search(
              searchQuery
            ) as SpotifyApi.SavedAlbumObject[]);

      const albums = sortAlbums(sortType, filteredAlbums);
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
