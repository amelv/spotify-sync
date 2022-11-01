import { Container, Fab, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { AlbumSelector } from "src/components/AlbumSelector";
import { withAuth } from "src/components/WithAuth";

export const SelectAlbums = withAuth(() => {
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
      <Fab
        color="secondary"
        size="large"
        sx={{
          position: "sticky",
          bottom: "48px",
          marginRight: "80%",
          height: "64px",
          fontSize: "1rem",
        }}
        component={Link}
        to="/"
        variant="extended"
      >
        Go Back
      </Fab>
      <Fab
        color="primary"
        size="large"
        sx={{
          position: "sticky",
          bottom: "48px",
          marginLeft: "80%",
          height: "64px",
          fontSize: "1rem",
        }}
        component={Link}
        to="/sync"
        variant="extended"
      >
        Continue
      </Fab>
    </Container>
  );
});
