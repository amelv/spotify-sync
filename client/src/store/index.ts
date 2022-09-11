import create from "zustand";
import { persist, PersistOptions, StateStorage } from "zustand/middleware";
import { immer } from 'zustand/middleware/immer'
import {enableMapSet} from 'immer'
import { get, set, del } from 'idb-keyval';
import { Serializable } from "worker_threads";
import { useEffect, useState } from "react";

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
}


interface Tokens {
  access: string;
  refresh: string;
  expiresIn: string;
  expiresAt?: Date;
}

interface SyncState {
  allAlbums: boolean,
  type: 'save' | 'delete',
  progress: number,
  completed: boolean
}

interface AppState {
  tokens: Tokens;
  setTokens: (token: Tokens) => void;
  selectedAlbums: Map<string, SpotifyApi.AlbumObjectFull>;
  selectAlbums: (...albums: SpotifyApi.AlbumObjectFull[]) => void;
  selectAllAlbums: (albums: SpotifyApi.AlbumObjectFull[]) => void;
  removeAlbums: (...albums: SpotifyApi.AlbumObjectFull[]) => void;
  clearAlbums: () => void;
  syncState: SyncState;
  setSyncState: (state: SyncState) => void;
}

enableMapSet();

const storePersistConfig: PersistOptions<AppState> = {
  name: "spotify-album-songs-sync-store",
  getStorage: () => zustandStorage,
  serialize: (data) => {
    return JSON.stringify({
      ...data,
      state: {
        ...data.state,
        selectedAlbums: Array.from(data.state.selectedAlbums.entries()),
        tokens: {...data.state.tokens, expiresAt: !!data.state.tokens.expiresAt ? data.state.tokens.expiresAt.getTime() : undefined}
      },
    });
  },
  deserialize: (value) => {
    const data = JSON.parse(value);

    data.state.selectedAlbums = new Map(data.state.selectedAlbums);
    if (!!data.state.tokens.expiresAt) {
      data.state.tokens.expiresAt = new Date(data.state.tokens.expiresAt)
    }

    return data;
  }
}

export const useStore = create<AppState>()(
  persist(immer(
    (set) => ({
      tokens: {
        access: '',
        refresh: '',
        expiresIn: ''
      },
      setTokens: (tokens: Tokens) => set( { tokens }),
      selectedAlbums: new Map<string, SpotifyApi.AlbumObjectFull>(),
      selectAlbums: (...albums: SpotifyApi.AlbumObjectFull[]) => set((state) => {
        albums.forEach(album => {
          state.selectedAlbums.set(album.id, album)
        })
      }),
      selectAllAlbums: (albums: SpotifyApi.AlbumObjectFull[]) => set((state) => {
        state.selectedAlbums = new Map(albums.map((album) => [album.id, album]))
      }),
      removeAlbums: (...albums: SpotifyApi.AlbumObjectFull[]) => set((state) => {
        albums.forEach(album => {
          state.selectedAlbums.delete(album.id)
        })
      }),
      clearAlbums: () => set((state) => {
        state.selectedAlbums.clear()
      }),
      syncState: {
        allAlbums: false,
        type: 'save',
        progress: 0,
        completed: false
      },
      setSyncState: (syncState: SyncState) => set((state) => {
        state.syncState = {...state.syncState, ...syncState}
      }),
    })),
    storePersistConfig
)
);


export const useHydration = () => {
  const [hydrated, setHydrated] = useState(useStore.persist.hasHydrated)

  useEffect(() => {
    const unsubHydrate = useStore.persist.onHydrate(() => setHydrated(false))
    const unsubFinishHydration = useStore.persist.onFinishHydration(() => setHydrated(true))

    setHydrated(useStore.persist.hasHydrated())

    return () => {
      unsubHydrate()
      unsubFinishHydration()
    }
  }, [])

  return hydrated
}

/*
const useHydratedStore = (selector: (any), equals?: any): typeof useStore => {
  const store = useStore();
  const isHydrated = useHydration()

  return {...store, ...selector, equals, getState: isHydrated ? store : undefined};
}
*/
