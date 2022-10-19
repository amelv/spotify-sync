import { enableMapSet } from "immer";
import { SliceCreator } from "src/store";

export interface AlbumSelectionSlice {
  selectedAlbums: Map<string, SpotifyApi.AlbumObjectFull>;
  selectAlbums: (...albums: SpotifyApi.AlbumObjectFull[]) => void;
  selectAllAlbums: (albums: SpotifyApi.AlbumObjectFull[]) => void;
  removeAlbums: (...albums: SpotifyApi.AlbumObjectFull[]) => void;
  clearAlbums: () => void;
}

enableMapSet();

export const createAlbumSelectionSlice: SliceCreator<AlbumSelectionSlice> = (
  set
) => ({
  selectedAlbums: new Map<string, SpotifyApi.AlbumObjectFull>(),
  selectAlbums: (...albums: SpotifyApi.AlbumObjectFull[]) =>
    set((state) => {
      albums.forEach((album) => {
        state.selectedAlbums.set(album.id, album);
      });
    }),
  selectAllAlbums: (albums: SpotifyApi.AlbumObjectFull[]) =>
    set((state) => {
      state.selectedAlbums = new Map(albums.map((album) => [album.id, album]));
    }),
  removeAlbums: (...albums: SpotifyApi.AlbumObjectFull[]) =>
    set((state) => {
      albums.forEach((album) => {
        state.selectedAlbums.delete(album.id);
      });
    }),
  clearAlbums: () =>
    set((state) => {
      state.selectedAlbums.clear();
    }),
});
