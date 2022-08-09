import { useCallback } from "react";
import { Button, Container, Typography } from "@mui/material";
import { saveSongsFromAlbumsRequest } from "../api-services";
import { useStore } from "../store";

export const Landing = () => {
  const accessToken = useStore((store) => store.accessToken);

  const handleClick = useCallback(async () => {
    await saveSongsFromAlbumsRequest(accessToken);
  }, [accessToken]);

  return (
    <Container>
      <Typography variant="h1">Add Saved Albums to "Liked Songs"</Typography>
      <Typography variant="caption">
        This will add all songs from your current saved albums into your "Liked
        Songs" playlist.
      </Typography>
      <Button onClick={handleClick}>Add Songs from Albums</Button>
    </Container>
  );
};
