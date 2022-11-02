import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "src/assets/logo.svg";
import { withAuth } from "src/components/WithAuth";
import { useHydration, useStore } from "src/store";

export const Landing = withAuth(() => {
  const navigate = useNavigate();
  const isHydrated = useHydration();
  const syncState = useStore((store) => store.syncState);
  const setSyncState = useStore((store) => store.setSyncState);
  const dispatchAlbumSelectionAction = useStore(
    (store) => store.dispatchAlbumSelectionAction
  );

  return isHydrated ? (
    <Container
      sx={{
        height: "100%",
        minHeight: "600px",
        maxWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <Logo />
      <Typography align="center" variant="h1">
        Spotify Albums to Songs Sync
      </Typography>
      <Typography
        variant="body1"
        sx={{ padding: ".25rem", maxWidth: "540px", textAlign: "center" }}
      >
        Sync your Spotify "Saved Albums" and "Liked Songs". Sync all albums or
        just a few.
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{
            width: "100%",
            maxWidth: 320,
          }}
          onClick={() => {
            dispatchAlbumSelectionAction({ type: "clear", payload: null });
            setSyncState({ ...syncState, allAlbums: false, completed: false });
            navigate("/select-albums");
          }}
        >
          Select Albums to Sync
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{
            width: "100%",
            maxWidth: 320,
          }}
          onClick={() => {
            dispatchAlbumSelectionAction({ type: "clear", payload: null });
            setSyncState({ ...syncState, allAlbums: true, completed: false });
            navigate("/sync");
          }}
        >
          Sync All Albums
        </Button>
      </Container>
    </Container>
  ) : null;
});
