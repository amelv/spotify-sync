import { Button, Container, LinearProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { withAuth } from "src/components/WithAuth";
import { useSyncRequest } from "src/hooks/useSyncRequest";

export const SyncResults = withAuth(() => {
  const navigate = useNavigate();
  const { status, progress, refetch } = useSyncRequest();

  return (
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
      <Typography variant="h1">Sync</Typography>
      {status}
      {status === "loading" && (
        <LinearProgress
          sx={{ height: 10, width: "100%", marginTop: 20 }}
          variant="determinate"
          value={progress * 100}
        />
      )}

      <Button
        variant="contained"
        onClick={() => navigate("/")}
        disabled={status === "loading"}
      >
        Done
      </Button>

      {status === "error" && (
        <Button variant="contained" color="primary" onClick={() => refetch()}>
          Retry
        </Button>
      )}
    </Container>
  );
});
