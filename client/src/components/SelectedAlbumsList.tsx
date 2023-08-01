import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Collapse,
  FormControl,
  InputLabel,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  OutlinedInput,
  Paper,
} from "@mui/material";
import { ChangeEvent, useMemo, useState } from "react";
import { useHydration, useStore } from "src/store";
import TrieSearch from "trie-search";

/**
 * The list of selected albums. The list is searchable. Clicking on an album will expand it to show its tracks.
 */
export const SelectedAlbumsList = () => {
  const isHydrated = useHydration();
  const selectedAlbums = useStore((store) => store.selectedAlbums);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [searchInput, setSearchInput] = useState("");
  const handleOpen = (id: string) => () =>
    setOpenItems((items) => ({ ...items, [id]: !items[id] }));

  const selectedAlbumDictionary = useMemo(() => {
    const dictionary = new TrieSearch();
    selectedAlbums.forEach((album) => {
      const key = `${album.name} ${album.artists.reduce(
        (names, artist) => `${names}${artist.name} `,
        ""
      )} ${album.tracks.items.reduce(
        (trackNames, track) => `${trackNames}${track.name} `,
        ""
      )}`;
      dictionary.map(key, album);
    });
    return dictionary;
  }, [selectedAlbums]);

  const searchMatchAlbums: SpotifyApi.AlbumObjectFull[] = useMemo(() => {
    const duplicateMap: Record<string, boolean> = {};
    return searchInput === ""
      ? Array.from(selectedAlbums.values())
      : selectedAlbumDictionary
          .search(searchInput.toLocaleLowerCase())
          .filter((album: SpotifyApi.AlbumObjectFull) => {
            if (!duplicateMap[album.id]) {
              duplicateMap[album.id] = true;
              return true;
            }
            return false;
          });
  }, [selectedAlbums, selectedAlbumDictionary, searchInput]);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <Paper
      elevation={1}
      component={List}
      sx={{
        width: "100%",
        maxWidth: 600,
        height: "50vh",
        overflow: "scroll",
        background:
          "linear-gradient(315deg, rgba(141,140,223,1) 0%, rgba(64,18,235,1) 100%)",
      }}
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          sx={{
            padding: "1rem",
            borderBottom: "1px solid black",
            backgroundColor: "#202020",
            boxShadow:
              "0px 7px 7px -4px rgba(0,0,0,0.2),0px 10px 13px 2px rgba(0,0,0,0.14),0px 4px 17px 3px rgba(0,0,0,0.12)",
          }}
          component="div"
          id="nested-list-subheader"
        >
          <FormControl
            sx={(theme) => ({
              m: 1,
              width: "32ch",
              "& label.Mui-focused": {
                color: theme.palette.primary.main,
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: theme.palette.primary.main,
              },
              "& .MuiInputBase-root": {
                borderColor: theme.palette.info.main,
              },
              "& .MuiInputBase-adornedEnd": {
                borderColor: theme.palette.info.main,
              },
              "& .MuiOutlinedInput-root": {
                "&:not(.Mui-focused) .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.info.main,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline .MuiSvgIcon-root":
                  {
                    color: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                  },
              },
            })}
            variant="outlined"
          >
            <InputLabel htmlFor="search-input">Search</InputLabel>
            <OutlinedInput
              label="Search"
              id="search-input"
              value={searchInput}
              onChange={onInputChange}
            />
          </FormControl>
        </ListSubheader>
      }
    >
      {isHydrated &&
        searchMatchAlbums.map((album, index) => (
          <div key={`${album.id}-${index}`}>
            <ListItemButton
              sx={{ fontSize: "1rem" }}
              onClick={handleOpen(album.id)}
            >
              <ListItemText
                primary={`${album.name} - ${album.artists
                  .map((artist) => artist.name)
                  .join(", ")}`}
              />
              {openItems[album.id] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse
              in={openItems[album.id] || !!searchInput}
              timeout="auto"
              unmountOnExit
            >
              <List
                sx={{ backgroundColor: "#acacacece" }}
                component="div"
                disablePadding
              >
                {album.tracks.items
                  .filter((track) =>
                    track.name
                      .toLocaleLowerCase()
                      .includes(searchInput.toLocaleLowerCase())
                  )
                  .map((track, idx) => (
                    <ListItemText
                      sx={{ marginLeft: "40px", fontSize: "0.875rem" }}
                      key={`${track.id}-${index}`}
                      primary={track.name}
                      primaryTypographyProps={{ variant: "body2" }}
                    />
                  ))}
              </List>
            </Collapse>
          </div>
        ))}
    </Paper>
  );
};
