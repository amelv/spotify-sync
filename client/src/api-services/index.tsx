import { AxiosResponse } from "axios";
import SpotifyRequestInterface from "src/api-services/spotifyApiRequest";
import TrieSearch from "trie-search";

const spotifyAPI = new SpotifyRequestInterface();

const ALBUM_LIMIT = 50;

export type SavedAlbums =
  SpotifyApi.PagingObject<SpotifyApi.SavedAlbumObject> & {
    albumDictionary?: any;
  };
export const getSavedAlbums = async (
  accessToken: string
): Promise<AxiosResponse<SavedAlbums, any>> => {
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

    const albumDictionary = new TrieSearch();

    albums.forEach((savedAlbum) => {
      const key = `${savedAlbum.album.name} ${savedAlbum.album.artists.reduce(
        (names, artist) => `${names}${artist.name} `,
        ""
      )}`;
      albumDictionary.map(key, savedAlbum);
    });

    return {
      ...albumGroupResponses.at(-1)!,
      data: {
        ...albumGroupResponses.at(-1)!.data,
        items: albums,
        albumDictionary: albumDictionary,
      },
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const syncSongsFromAlbumsRequest = async (
  accessToken: string,
  action: "save" | "delete",
  onProgress: (value: number) => void,
  albums?: Map<string, SpotifyApi.AlbumObjectFull>
): Promise<AxiosResponse<SpotifyApi.SaveTracksForUserResponse, any>[]> => {
  const reduceAlbumsToTrackSyncPromises = (
    albums: Array<SpotifyApi.AlbumObjectFull>
  ) =>
    albums.reduce(
      (promises, album, index, { length }) => [
        ...promises,
        ...new Array(Math.ceil(album.tracks.items.length / ALBUM_LIMIT))
          .fill(undefined)
          .map((_, idx) =>
            spotifyAPI
              .makeRequest<SpotifyApi.SaveTracksForUserResponse>({
                accessToken,
                urlEndpoint: `me/tracks`,
                method: action === "save" ? "PUT" : "DELETE",
                data: JSON.stringify(
                  album.tracks.items
                    .slice(50 * idx, 50 * (idx + 1))
                    .map((track) => track.id)
                ),
              })
              .then((data) => {
                console.log(index / (length - 1));
                onProgress(index / (length - 1));
                return data;
              })
          ),
      ],
      [] as Promise<any>[]
    );
  try {
    // If array of albums to sync provided
    if (albums) {
      return Promise.all(
        reduceAlbumsToTrackSyncPromises(Array.from(albums.values()))
      );
    }

    const allSavedAlbumsResponse = await getSavedAlbums(accessToken);
    /*spotifyAPI
          .makeRequest<SpotifyApi.SaveTracksForUserResponse>({
            accessToken,
            urlEndpoint: `me/tracks`,
            method: action === "save" ? "PUT" : "DELETE",
            data: JSON.stringify(
              album.tracks.items.slice(0, 50).map((track) => track.id)
            ),
          })
          .then((data) => {
            onProgress(index / length - 1);
            return data;
          })*/
    // Else, we sync all albums
    return Promise.all(
      reduceAlbumsToTrackSyncPromises(
        allSavedAlbumsResponse.data.items.map(({ album }) => album)
      )
    );
  } catch (error) {
    return Promise.reject(error);
  }
};
