import { AxiosResponse } from "axios";

import SpotifyRequestInterface from "./spotify-api-request";

const spotifyAPI = new SpotifyRequestInterface();

export const saveSongsFromAlbumsRequest = async (
  accessToken: string
): Promise<AxiosResponse<SpotifyApi.SaveTracksForUserResponse, any>[]> => {
  const ALBUM_LIMIT = 50;

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
        const groupAlbums = albumGroupReponse.data.items.map((album) => album);
        return [...albumList, ...groupAlbums];
      },
      []
    );

    const saveTrackResponses = await Promise.all(
      albums.map(({ album }) =>
        spotifyAPI.makeRequest<SpotifyApi.SaveTracksForUserResponse>({
          accessToken,
          urlEndpoint: `me/tracks`,
          method: "PUT",
          data: JSON.stringify(
            album.tracks.items.slice(0, 50).map((track) => track.id)
          ),
        })
      )
    );

    return Promise.resolve(saveTrackResponses);
  } catch (error) {
    return Promise.reject(error);
  }
};
