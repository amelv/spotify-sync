import { useState, Dispatch, SetStateAction } from "react";
import { Button, MenuItem, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Select } from "@mui/material";
import { useStore, useHydration } from "../store";
import Search from '@mui/icons-material/Search'

export enum SortOption {
  DESCENDING_ADD_DATE = "Date Added (Newest to Oldest)",
  ASCENDING_ADD_DATE = "Date Added (Oldest to Newest)",
  DESCENDING_RELEASE_DATE = "Release Date (Newest to Oldest)",
  ASCENDING_RELEASE_DATE = "Release Date (Oldest to Newest)",
  ASCENDING_ALBUM = "Album Name (A-Z)",
  DESCENDING_ALBUM = "Album Name (Z-A)",
  ASCENDING_ARTIST = "Artist (A-Z)",
  DESCENDING_ARTIST = "Artist (Z-A)",
}


export interface FormState {
  searchQuery: string;
  sortOption: SortOption; 
}

interface Props {
    formState: [FormState, Dispatch<SetStateAction<FormState>>]
    handleSelectAll: () => void;
}

export const FilterAlbumsForm = ({formState, handleSelectAll}: Props) => {
  const [{searchQuery, sortOption}, setFormState] = formState
  const [searchInputValue, setSearchInputValue] = useState(searchQuery)
  const isHydrated = useHydration()
  const clearAlbums = useStore((store) => store.clearAlbums)
        
  return isHydrated ? (
      <form style={{position: 'sticky', top: 40, width: '100%', height: '100px', backgroundColor: 'white', zIndex: 3, display: 'flex', flexDirection:'row', justifyContent: 'center', alignItems: 'center', gap: '20px', border: '2px solid black', boxShadow: '0px 7px 7px -4px rgba(0,0,0,0.2),0px 10px 13px 2px rgba(0,0,0,0.14),0px 4px 17px 3px rgba(0,0,0,0.12)', borderRadius: '4px', }} onSubmit={(e) => {
        e.preventDefault();
        setFormState((values) => ({...values, searchQuery: searchInputValue}))
      }}>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="search-input">Search</InputLabel>
            <OutlinedInput
                label="Search"
                id="search-input"
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                endAdornment={
                <InputAdornment
                    position="end">
                    <IconButton
                        aria-label="submit your search"
                        type="submit"
                        edge="end"
                        >
                            <Search />
                    </IconButton>
                </InputAdornment>
            } />

        </FormControl>
        <Select value={sortOption} onChange={(event) => setFormState((values) => ({...values, sortOption: event.target.value as SortOption}))}>
            {Object.values(SortOption).map((optionValue) => <MenuItem key={optionValue} value={optionValue}>
              {optionValue}
            </MenuItem>)}
        </Select>
        <Button variant="outlined" color="secondary" onClick={clearAlbums}>
          Clear
        </Button>
        <Button variant="outlined" color="primary" onClick={handleSelectAll}>
          Select All
        </Button>
      </form>
  ) : null;
};
