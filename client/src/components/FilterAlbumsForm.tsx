import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Search from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Collapse,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  useMediaQuery,
  useTheme,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [{ searchQuery, sortOption }, dispatch] = selectorState;
  const [searchInputValue, setSearchInputValue] = useState(searchQuery);
  const [hideFormInputs, setHideFormInputs] = useState(isMobile);
  const isHydrated = useHydration();
  const dispatchAlbumSelectionAction = useStore(
    (store) => store.dispatchAlbumSelectionAction
  );

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
    <Container
      component="form"
      sx={{
        position: "sticky",
        top: 40,
        width: "100%",
        maxHeight: ["100%", "120px"],
        padding: ["1rem", "0.5rem"],
        backgroundColor: "white",
        zIndex: 3,
        display: "flex",
        flexDirection: ["column", "row"],
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
      {isMobile ? (
        <Collapse in={isMobile ? !hideFormInputs : true}>
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: ["100%", "25%"],
              justifyContent: ["space-between", "space-evenly"],
              gap: ".25rem",
            }}
          >
            <Button
              disabled={!isHydrated}
              variant="outlined"
              color="secondary"
              onClick={() =>
                dispatchAlbumSelectionAction({ type: "clear", payload: null })
              }
            >
              Clear
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSelectAll}
            >
              Select All
            </Button>
          </Box>
        </Collapse>
      ) : (
        <>
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: ["100%", "25%"],
              justifyContent: ["space-between", "space-evenly"],
              gap: ".25rem",
            }}
          >
            <Button
              disabled={!isHydrated}
              variant="outlined"
              color="secondary"
              onClick={() =>
                dispatchAlbumSelectionAction({ type: "clear", payload: null })
              }
            >
              Clear
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSelectAll}
            >
              Select All
            </Button>
          </Box>
        </>
      )}

      {isMobile && (
        <IconButton
          type="button"
          onClick={() => setHideFormInputs((val) => !val)}
        >
          {hideFormInputs ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
      )}
    </Container>
  );
};
