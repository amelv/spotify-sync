"use client";

import { StateCreator, create } from "zustand";
import { immer } from "zustand/middleware/immer";

import {
  AlbumSelectionSlice,
  createAlbumSelectionSlice,
} from "@/store/albumSelectionSlice";
import { Middleware } from "@/store/middleware";
import { SyncSlice, createSyncSlice } from "@/store/syncSlice";

interface StepSlice {
  activeStep: number;
  dispatchSlice: (step: number) => void;
}

const createStepSlice: SliceCreator<StepSlice> = (set) => ({
  activeStep: 0,
  dispatchSlice: (step) => set({ activeStep: step }),
});

export type AppState = AlbumSelectionSlice & SyncSlice & StepSlice;
export type SliceCreator<S> = StateCreator<AppState, Middleware, [], S>;

/**
 * A combination of all the slices in the store.
 */
const createAppState: StateCreator<AppState, Middleware, [], AppState> = (
  ...stateCreator
) => ({
  ...createAlbumSelectionSlice(...stateCreator),
  ...createSyncSlice(...stateCreator),
  ...createStepSlice(...stateCreator),
});

export const useStore = create<AppState>()(immer(createAppState));
