import { enableMapSet } from "immer";
import { SortOption } from "src/hooks/useSelectorState";
import { SliceCreator } from "src/store";

interface Action {
  type:
    | "select"
    | "select-all"
    | "remove"
    | "clear"
    | "increment-grid-size"
    | "update-search"
    | "update-sort";
  payload: any;
}

export interface AlbumSelectionSlice {
  selectedAlbums: Map<string, SpotifyApi.AlbumObjectFull>;
  albumGridSize: number;
  searchQuery: string;
  sortOption: SortOption | "";
  dispatchAlbumSelectionAction: (action: Action) => void;
}

enableMapSet();
const ALBUM_INTERVAL = 24;
export const createAlbumSelectionSlice: SliceCreator<AlbumSelectionSlice> = (
  set
) => ({
  selectedAlbums: new Map<string, SpotifyApi.AlbumObjectFull>(),
  albumGridSize: ALBUM_INTERVAL,
  searchQuery: "",
  sortOption: "",
  dispatchAlbumSelectionAction: ({ type, payload }: Action) => {
    set((state) => {
      switch (type) {
        case "select":
          state.selectedAlbums.set(payload.id, payload);
          return;
        case "select-all":
          state.selectedAlbums = new Map(
            payload.map((album: SpotifyApi.AlbumObjectFull) => [
              album.id,
              album,
            ])
          );
          return;
        case "remove":
          state.selectedAlbums.delete(payload.id);
          return;
        case "clear":
          state.selectedAlbums.clear();
          return;
        case "increment-grid-size":
          const albumsRemaining = payload - state.albumGridSize;

          state.albumGridSize =
            albumsRemaining < ALBUM_INTERVAL
              ? state.albumGridSize + albumsRemaining
              : state.albumGridSize + ALBUM_INTERVAL;
          return;
        case "update-search":
          state.searchQuery = payload;
          state.albumGridSize = ALBUM_INTERVAL;
          return;
        case "update-sort":
          state.sortOption = payload;
          return;
        default:
          return;
      }
    });
  },
});
