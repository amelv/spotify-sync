import { Button, Container, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmationDialog } from "src/components/ConfirmationDialog";
import { SelectedAlbumsList } from "src/components/SelectedAlbumsList";
import { withAuth } from "src/components/WithAuth";
import { useHydration, useStore } from "src/store";

/**
 * The page where we confirm the selected albums and submit the sync request.
 */
export const Confirmation = withAuth(() => {
  const isHydrated = useHydration();
  const syncState = useStore((store) => store.syncState);
  const setSyncState = useStore((store) => store.setSyncState);
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  const handleDelete = useCallback(async () => {
    setSyncState({ ...syncState, type: "delete" });
    setShowDialog(true);
  }, [syncState, setSyncState]);

  const handleSave = useCallback(async () => {
    setSyncState({ ...syncState, type: "save" });
    setShowDialog(true);
  }, [syncState, setSyncState]);

  return isHydrated ? (
    <Container
      sx={{
        maxWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: "30px",
        padding: "20px",
      }}
    >
      <Typography align="center" variant="h1">
        Add Saved Albums to "Liked Songs"
      </Typography>
      <Typography align="center" variant="body1">
        This will add all songs from your selected saved albums into your "Liked
        Songs" playlist.
      </Typography>
      {syncState.allAlbums ? (
        <Typography variant="h4">
          You are syncing ALL your saved albums.
        </Typography>
      ) : (
        <SelectedAlbumsList />
      )}
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
        <Button
          variant="contained"
          color="error"
          disabled={!isHydrated}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="success"
          disabled={!isHydrated}
          onClick={handleSave}
        >
          Save
        </Button>
      </Container>
      <ConfirmationDialog
        open={showDialog}
        type={syncState.type ?? "save"}
        onCancel={() => setShowDialog(false)}
        onContinue={() => {
          navigate("/sync-results");
        }}
      />
    </Container>
  ) : null;
});
