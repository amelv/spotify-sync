"use client";

import { getSavedAlbums, SavedAlbums } from "@/api-services";
import { SortOption } from "@/hooks/useSelectorState";
import { getSessionToken } from "@/lib/utils";
import { useStore } from "@/store";
import { sort } from "fast-sort";
import { useSession } from "next-auth/react";
import { useCallback } from "react";
import { useQuery } from "react-query";

/**
 * Sorts the albums based on the sort option.
 *
 * @param sortOption
 * @param albums
 * @returns
 */
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

/**
 * Gets the saved albums from the Spotify API and sorts them based on the sort option.
 *
 * @returns
 */
export const useSavedAlbumsQuery = () => {
  const { data: session } = useSession();
  const accessToken = getSessionToken(session)?.accessToken;
  const searchQuery = useStore((store) => store.searchQuery);
  const sortOption = useStore((store) => store.sortOption);

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
    ["saved-albums", accessToken],
    useCallback(async () => {
      if (!accessToken) {
        return undefined;
      }
      try {
        const response = await getSavedAlbums(accessToken);
        console.log("running query function");
        return response.data;
      } catch (error) {
        return Promise.reject(error);
      }
    }, [accessToken]),
    {
      select: selectAlbumsFromQuery,
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
};
