import { Container, Fab, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { AlbumSelector } from "src/components/AlbumSelector";
import { withAuth } from "src/components/WithAuth";
import { useStore } from "src/store";

export const SelectAlbums = withAuth(() => {
  const selectedAlbums = useStore((store) => store.selectedAlbums);
  return (
    <Container
      sx={{
        maxWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: "30px",
        minHeight: "80vh",
      }}
    >
      <Typography variant="h1">Select Albums to Add</Typography>
      <Typography variant="body1">
        This will add all songs from your current saved albums into your "Liked
        Songs" playlist.
      </Typography>

      <AlbumSelector />

      <Container
        sx={{
          position: "sticky",
          bottom: "48px",
          fontSize: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        <Fab
          color="secondary"
          size="large"
          sx={{
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
            height: "64px",
            fontSize: "1rem",
          }}
          component={Link}
          to="/sync"
          variant="extended"
          disabled={selectedAlbums.size === 0}
        >
          Continue
        </Fab>
      </Container>
    </Container>
  );
});
