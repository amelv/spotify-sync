import { Button, Container, LinearProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSyncRequest } from "src/hooks/useSyncRequest";

export const SyncResults = () => {
  const navigate = useNavigate();
  const { status, progress } = useSyncRequest();

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
      {status !== "start" && (
        <LinearProgress
          sx={{ height: 10, width: "100%", marginTop: 20 }}
          variant="determinate"
          value={progress * 100}
        />
      )}
      {status === "success" && (
        <Button variant="contained" onClick={() => navigate("/")}>
          Done
        </Button>
      )}
    </Container>
  );
};
