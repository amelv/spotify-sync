import { useEffect, useState } from "react";
import create, { StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import {
  AlbumSelectionSlice,
  createAlbumSelectionSlice,
} from "src/store/albumSelectionSlice";
import { Middleware, storePersistConfig } from "src/store/middleware";
import { createSyncSlice, SyncSlice } from "src/store/syncSlice";
import { createTokensSlice, TokensSlice } from "src/store/tokensSlice";

interface StepSlice {
  activeStep: number;
  dispatchSlice: (step: number) => void;
}

const createStepSlice: SliceCreator<StepSlice> = (set) => ({
  activeStep: 0,
  dispatchSlice: (step) => set({ activeStep: step }),
});

export type AppState = AlbumSelectionSlice &
  SyncSlice &
  TokensSlice &
  StepSlice;
export type SliceCreator<S> = StateCreator<AppState, Middleware, [], S>;

/**
 * A combination of all the slices in the store.
 */
const createAppState: StateCreator<AppState, Middleware, [], AppState> = (
  ...stateCreator
) => ({
  ...createAlbumSelectionSlice(...stateCreator),
  ...createSyncSlice(...stateCreator),
  ...createTokensSlice(...stateCreator),
  ...createStepSlice(...stateCreator),
});

export const useStore = create<AppState>()(
  persist(immer(createAppState), storePersistConfig)
);

/**
 * A hook that returns true if the store has been hydrated.
 * 
 * @returns true if the store has been hydrated, false otherwise
 */
export const useHydration = () => {
  const [hydrated, setHydrated] = useState(useStore.persist.hasHydrated);

  useEffect(() => {
    const unsubHydrate = useStore.persist.onHydrate(() => setHydrated(false));
    const unsubFinishHydration = useStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );

    setHydrated(useStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};
