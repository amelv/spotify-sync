import { del, get, set } from "idb-keyval";
import { AppState } from "src/store";
import { Serializable } from "worker_threads";
import { PersistOptions, StateStorage } from "zustand/middleware";

export type Middleware = [
  ["zustand/persist", unknown],
  ["zustand/immer", never]
];

const zustandStorage: StateStorage = {
  getItem: async (key: string): Promise<any | null> => {
    return (await get(key)) || null;
  },
  setItem: async (key: string, value: Serializable): Promise<void> => {
    await set(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    await del(key);
  },
};

export const storePersistConfig: PersistOptions<AppState> = {
  name: "spotify-album-songs-sync-store",
  getStorage: () => zustandStorage,
  serialize: (data) => {
    return JSON.stringify({
      ...data,
      state: {
        ...data.state,
        selectedAlbums: Array.from(data.state.selectedAlbums.entries()),
        tokens: {
          ...data.state.tokens,
          access: "",
          expiresAt: !!data.state.tokens.expiresAt
            ? data.state.tokens.expiresAt.getTime()
            : undefined,
        },
      },
    });
  },
  deserialize: (value) => {
    const data = JSON.parse(value);

    data.state.selectedAlbums = new Map(data.state.selectedAlbums);
    if (!!data.state.tokens.expiresAt) {
      data.state.tokens.expiresAt = new Date(data.state.tokens.expiresAt);
    }

    return data;
  },
};
