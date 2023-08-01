import { SliceCreator } from "src/store";

interface SyncState {
  allAlbums: boolean;
  type: "save" | "delete";
  progress: number;
  completed: boolean;
}

export interface SyncSlice {
  syncState: SyncState;
  setSyncState: (state: SyncState) => void;
}

/**
 * Creates a slice for managing the sync state. The slice contains the
 * following state:
 * - syncState: the sync state
 * - setSyncState: a function that sets the sync state
 * 
 * @param set 
 * @returns 
 */
export const createSyncSlice: SliceCreator<SyncSlice> = (set) => ({
  syncState: {
    allAlbums: false,
    type: "save",
    progress: 0,
    completed: false,
  },
  setSyncState: (syncState: SyncState) =>
    set((state) => {
      state.syncState = { ...state.syncState, ...syncState };
    }),
});
