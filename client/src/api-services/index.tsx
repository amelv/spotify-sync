import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useStore } from "../store";

import SpotifyRequestInterface from "./spotify-api-request";

const spotifyAPI = new SpotifyRequestInterface();

const ALBUM_LIMIT = 50;

const QUERY_LIMIT = 20;

const getNextOffset = (url: string | null): number | null => url ? Number(new URL(url).searchParams.get('offset')) : null

export const getSavedAlbums = async (accessToken: string): Promise<AxiosResponse<SpotifyApi.PagingObject<SpotifyApi.SavedAlbumObject>, any>> => {
  try {
    const checkTotalAlbumsResponse =
    await spotifyAPI.makeRequest<SpotifyApi.UsersSavedAlbumsResponse>({
      accessToken,
      urlEndpoint: `me/albums?limit=1`,
      method: "get",
    });

  const numberOfAlbums = Math.ceil(
    checkTotalAlbumsResponse.data.total / ALBUM_LIMIT
  );

  const albumGroupResponses = await Promise.all(
    new Array(numberOfAlbums).fill(undefined).map((_, index) =>
      spotifyAPI.makeRequest<SpotifyApi.UsersSavedAlbumsResponse>({
        accessToken,
        urlEndpoint: `me/albums?${new URLSearchParams({
          limit: `${ALBUM_LIMIT}`,
          offset: `${index * ALBUM_LIMIT}`,
        })}`,
        method: "get",
      })
    )
  );
    const albums = albumGroupResponses.reduce<SpotifyApi.SavedAlbumObject[]>(
      (albumList, albumGroupReponse) => {
        const groupAlbums = albumGroupReponse.data.items;
        return [...albumList, ...groupAlbums];
      },
      [] 
    );
    return { ...albumGroupResponses.at(-1)!, data: { ...albumGroupResponses.at(-1)!.data, items: albums}}
  } catch (error) {
    return Promise.reject(error)
  }
}  
//TODO: save tracks for albums greater than 50
export const syncSongsFromAlbumsRequest = async (
  accessToken: string,
  action: 'save' | 'delete',
  onProgress: (value: number) => void,
  albums?: Map<string, SpotifyApi.AlbumObjectFull>,
): Promise<AxiosResponse<SpotifyApi.SaveTracksForUserResponse, any>[]> => {
  try {
    if (albums) {
      return Promise.all(
        Array.from(albums.values()).map((album, index, array) =>
          spotifyAPI.makeRequest<SpotifyApi.SaveTracksForUserResponse>({
            accessToken,
            urlEndpoint: `me/tracks`,
            method: action === 'save' ? "PUT" : 'DELETE',
            data: JSON.stringify(
              album.tracks.items.slice(0, 50).map((track) => track.id)
            ),
          }).then((data) => {
            console.log(index / array.length)
            onProgress(index / array.length)
            return data
          })
        )
      );
    }

    const allSavedAlbumsResponse = await getSavedAlbums(accessToken);

    return Promise.all(
      allSavedAlbumsResponse.data.items.map(({album}, index, array) => 
      spotifyAPI.makeRequest<SpotifyApi.SaveTracksForUserResponse>({
        accessToken,
        urlEndpoint: `me/tracks`,
        method: action === 'save' ? "PUT" : 'DELETE',
        data: JSON.stringify(
          album.tracks.items.slice(0, 50).map((track) => track.id)
        ),
      }).then((data) => {
        onProgress(index / array.length)
        return data
      }))
    )
  } catch (error) {
    return Promise.reject(error);
  }
};
