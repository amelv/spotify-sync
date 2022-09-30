import Search from "@mui/icons-material/Search";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Dispatch, FormEvent, useState } from "react";
import {
  SelectorActionType,
  SelectorState,
  SortOption,
} from "src/hooks/useSelectorState";
import { useHydration, useStore } from "src/store";

interface Props {
  selectorState: [SelectorState, Dispatch<SelectorActionType>];
  handleSelectAll: () => void;
}

const ALBUM_INTERVAL = 24;

export const FilterAlbumsForm = ({ selectorState, handleSelectAll }: Props) => {
  const [{ searchQuery, sortOption }, dispatch] = selectorState;
  const [searchInputValue, setSearchInputValue] = useState(searchQuery);
  const isHydrated = useHydration();
  const clearAlbums = useStore((store) => store.clearAlbums);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: "update_search_query", payload: searchInputValue });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 20);
      });
    });
  };

  return (
    <form
      style={{
        position: "sticky",
        top: 40,
        width: "100%",
        height: "100px",
        backgroundColor: "white",
        zIndex: 3,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        border: "2px solid black",
        boxShadow:
          "0px 7px 7px -4px rgba(0,0,0,0.2),0px 10px 13px 2px rgba(0,0,0,0.14),0px 4px 17px 3px rgba(0,0,0,0.12)",
        borderRadius: "4px",
      }}
      onSubmit={onSubmit}
    >
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="search-input">Search</InputLabel>
        <OutlinedInput
          label="Search"
          id="search-input"
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="submit your search"
                type="submit"
                edge="end"
              >
                <Search />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Select
        value={sortOption}
        onChange={(event) =>
          dispatch({
            type: "update_sort_option",
            payload: event.target.value as SortOption,
          })
        }
      >
        {Object.values(SortOption).map((optionValue) => (
          <MenuItem key={optionValue} value={optionValue}>
            {optionValue}
          </MenuItem>
        ))}
      </Select>
      <Button
        disabled={!isHydrated}
        variant="outlined"
        color="secondary"
        onClick={clearAlbums}
      >
        Clear
      </Button>
      <Button variant="outlined" color="primary" onClick={handleSelectAll}>
        Select All
      </Button>
    </form>
  );
};
