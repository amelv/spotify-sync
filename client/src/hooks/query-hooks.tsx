import { useCallback, useState, } from "react";
import { getSavedAlbums } from "../api-services";
import { useHydration, useStore } from "../store";
import { useQuery } from "react-query";
import {  FormState, SortOption } from "../components/FilterAlbumsForm";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useTokenRefresh } from ".";

const filterAlbum = (searchQuery: string, savedAlbum: SpotifyApi.SavedAlbumObject) => {
  const normalizedQuery = searchQuery.toLowerCase().split(' ');

  const normalizedArtists = savedAlbum.album.artists.reduce<string[]>((list, artist) => [...list, ...artist.name.toLowerCase().split(' ')], [])
  const normalizedAlbumName = savedAlbum.album.name.toLowerCase().split(' ')

  return normalizedQuery.some((q) => [...normalizedArtists, ...normalizedAlbumName].some((str) => str.includes(q)))
}

const ALBUM_INTERVAL = 24

const sortAlbums = (sortOption: SortOption, savedAlbumA: SpotifyApi.SavedAlbumObject, savedAlbumB: SpotifyApi.SavedAlbumObject) => {
  switch (sortOption) {
    case SortOption.ASCENDING_ADD_DATE:
      return new Date(savedAlbumA.added_at).getTime() - new Date(savedAlbumB.added_at).getTime()
    case SortOption.DESCENDING_ADD_DATE:
      return new Date(savedAlbumB.added_at).getTime() - new Date(savedAlbumA.added_at).getTime()
    case SortOption.ASCENDING_RELEASE_DATE:
      console.log(new Date(savedAlbumA.album.release_date).getTime() - new Date(savedAlbumB.added_at).getTime())
      return new Date(savedAlbumA.album.release_date).getTime() - new Date(savedAlbumB.added_at).getTime()
    case SortOption.DESCENDING_RELEASE_DATE:
      console.log(savedAlbumA.album.release_date)
      return new Date(savedAlbumB.album.release_date).getTime() - new Date(savedAlbumA.added_at).getTime()
    case SortOption.ASCENDING_ALBUM:
      return savedAlbumA.album.name.localeCompare(savedAlbumB.album.name)
    case SortOption.DESCENDING_ALBUM:
      return savedAlbumB.album.name.localeCompare(savedAlbumA.album.name)
    case SortOption.ASCENDING_ARTIST:
      return savedAlbumA.album.name.localeCompare(savedAlbumB.album.name)
    case SortOption.DESCENDING_ARTIST:
      return savedAlbumB.album.artists[0].name.localeCompare(savedAlbumA.album.artists[0].name)
    default:
      return 0;
  }
}


export const useSavedAlbumsQuery = (formValues: FormState) => {
  const isHydrated = useHydration()
  const accessToken = useStore((store) => store.tokens.access);
  const {searchQuery, sortOption} = formValues

  useTokenRefresh();

  const selectAlbumsFromQuery = useCallback((data: SpotifyApi.PagingObject<SpotifyApi.SavedAlbumObject> | undefined): SpotifyApi.PagingObject<SpotifyApi.SavedAlbumObject> | undefined => {
    if (!data) {
      return undefined
    }

    const albums = data.items.filter((savedAlbum) => 
    filterAlbum(searchQuery, savedAlbum)).sort((a,b) => 
    sortAlbums(sortOption, a, b))

    return {...data, items: albums}
  }, [searchQuery, sortOption])

  return useQuery<SpotifyApi.PagingObject<SpotifyApi.SavedAlbumObject> | undefined>(['saved-albums', isHydrated, accessToken], 
      async () => {
        if (!isHydrated) {
          return undefined;
        }
        try {
          const response = await getSavedAlbums(accessToken)
          return response.data
        } catch (error) {
          return Promise.reject(error);
        }
        }, 
        {
          select: selectAlbumsFromQuery,
        keepPreviousData: false,
        refetchOnWindowFocus: false})
};
