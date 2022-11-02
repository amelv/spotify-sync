import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useHydration, useStore } from "src/store";

interface Props {
  currentAlbums: SpotifyApi.SavedAlbumObject[];
}

export const SelectedAlbumsList = () => {
  const isHydrated = useHydration();
  const selectedAlbums = useStore((store) => store.selectedAlbums);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const handleOpen = (id: string) => () =>
    setOpenItems((items) => ({ ...items, [id]: !items[id] }));

  return (
    <Paper
      elevation={1}
      component={List}
      sx={{
        width: "100%",
        maxWidth: 600,
        height: "100%",
        maxHeight: "50vh",
        overflow: "scroll",
        bgcolor: "background.paper",
      }}
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          sx={{ padding: "1rem", borderBottom: "1px solid black" }}
          component="div"
          id="nested-list-subheader"
        >
          <Typography variant="h3">Selected Albums</Typography>
        </ListSubheader>
      }
    >
      {isHydrated &&
        Array.from(selectedAlbums.values()).map((album) => (
          <div key={album.id}>
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
            <Collapse in={openItems[album.id]} timeout="auto" unmountOnExit>
              <List
                sx={{ backgroundColor: "#acacacece" }}
                component="div"
                disablePadding
              >
                {album.tracks.items.map((track) => (
                  <ListItemText
                    sx={{ marginLeft: "40px", fontSize: "0.875rem" }}
                    key={track.id}
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
