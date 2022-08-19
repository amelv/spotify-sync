import create from "zustand";
import { persist } from "zustand/middleware";

interface Tokens {
  access: string;
  refresh: string;
  expiresIn: string;
}

interface AppState {
  tokens: Tokens;
  setTokens: (token: Tokens) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      tokens: {
        access: '',
        refresh: '',
        expiresIn: ''
      },
      setTokens: (tokens: Tokens) => set({ tokens }),
    }),
    {
      name: "spotify-album-songs-sync-store",
      getStorage: () => sessionStorage,
    }
  )
);
