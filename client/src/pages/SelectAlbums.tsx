import { Container, Typography } from "@mui/material";
import { AlbumSelector } from "src/components/AlbumSelector";

export const SelectAlbums = () => {
  return (
    <Container
      sx={{
        maxWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <Typography variant="h1">Select Albums to Add</Typography>
      <Typography variant="caption">
        This will add all songs from your current saved albums into your "Liked
        Songs" playlist.
      </Typography>
      <AlbumSelector />
    </Container>
  );
};
