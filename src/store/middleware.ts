import { AppState } from "@/store";
import { PersistOptions,  PersistStorage, StateStorage, createJSONStorage} from "zustand/middleware";

export type Middleware = [
  ["zustand/persist", unknown],
  ["zustand/immer", never]
];

const ALBUM_INTERVAL = 24;

/**
 * A configuration object for the zustand persist middleware.
 */
export const storePersistConfig: PersistOptions<AppState> = {
  name: "spotify-album-songs-sync-store",
  storage: createJSONStorage(() => sessionStorage),
  partialize: (state) => ({
    ...state,
    albumGridSize: ALBUM_INTERVAL, // optional tweaks
  }),
};
