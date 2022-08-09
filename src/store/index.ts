import create from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  accessToken: string;
  setAccessToken: (token: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      accessToken: "",
      setAccessToken: (token: string) => set({ accessToken: token }),
    }),
    {
      name: "spotify-album-songs-sync-store",
      getStorage: () => sessionStorage,
    }
  )
);
