import { useImmerReducer } from "use-immer";

export enum SortOption {
  DESCENDING_ADD_DATE = "Date Added (Newest to Oldest)",
  ASCENDING_ADD_DATE = "Date Added (Oldest to Newest)",
  DESCENDING_RELEASE_DATE = "Release Date (Newest to Oldest)",
  ASCENDING_RELEASE_DATE = "Release Date (Oldest to Newest)",
  ASCENDING_ALBUM = "Album Name (A-Z)",
  DESCENDING_ALBUM = "Album Name (Z-A)",
  ASCENDING_ARTIST = "Artist (A-Z)",
  DESCENDING_ARTIST = "Artist (Z-A)",
  POPULARITY = "Popularity",
}

export interface SelectorState {
  searchQuery: string;
  sortOption: SortOption | "";
  albumGridSize: number;
}

export type SelectorActionOption =
  | "reset"
  | "increment_grid_size"
  | "update_search_query"
  | "update_sort_option";

export type SelectorActionType =
  | {
      type: "reset";
      payload: undefined;
    }
  | {
      type: "increment_grid_size";
      payload: number;
    }
  | {
      type: "update_search_query";
      payload: string;
    }
  | {
      type: "update_sort_option";
      payload: SortOption | "";
    };

const ALBUM_INTERVAL = 24;

const initialState: SelectorState = {
  searchQuery: "",
  sortOption: "",
  albumGridSize: ALBUM_INTERVAL,
};

/**
 * Reducer for the selector state. 
 * 
 * @returns 
 */
export const useSelectorState = () => {
  return useImmerReducer<SelectorState, SelectorActionType>(
    (draft, action: SelectorActionType) => {
      switch (action.type) {
        case "reset":
          return initialState;
        case "increment_grid_size":
          const albumsRemaining = action.payload - draft.albumGridSize;

          draft.albumGridSize =
            albumsRemaining < ALBUM_INTERVAL
              ? draft.albumGridSize + albumsRemaining
              : draft.albumGridSize + ALBUM_INTERVAL;
          return;
        case "update_search_query":
          draft.searchQuery = action.payload;
          draft.albumGridSize = ALBUM_INTERVAL;
          return;
        case "update_sort_option":
          draft.sortOption = action.payload;
          return;
      }
    },
    initialState
  );
};
