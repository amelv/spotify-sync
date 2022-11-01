import { enableMapSet } from "immer";
import { SliceCreator } from "src/store";

interface Action {
  type: "select" | "select-all" | "remove" | "clear";
  payload: any;
}

export interface AlbumSelectionSlice {
  selectedAlbums: Map<string, SpotifyApi.AlbumObjectFull>;
  dispatchAlbumSelectionAction: (action: Action) => void;
}

enableMapSet();

export const createAlbumSelectionSlice: SliceCreator<AlbumSelectionSlice> = (
  set
) => ({
  selectedAlbums: new Map<string, SpotifyApi.AlbumObjectFull>(),
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
        default:
          return;
      }
    });
  },
});
