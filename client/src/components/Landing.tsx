import { Container, Button, Typography  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStore, useHydration } from "../store";

export const Landing = () => {
  const navigate = useNavigate();
  const isHydrated = useHydration()
  const syncState = useStore((store) => store.syncState)
  const setSyncState = useStore((store) => store.setSyncState)
  const clearAlbums = useStore((store) => store.clearAlbums)

  return isHydrated ? (
    <Container sx={{maxWidth: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems:'center', gap: '30px'}}>
      <Typography variant="h1" sx={{fontSize: '2.5rem'}}>
        Spotify Albums to Songs Sync
      </Typography>
      <Button variant="contained"
        onClick={() => {
          clearAlbums();
          setSyncState({...syncState, allAlbums: false, completed: false})
          navigate('/select-albums')
        }}>
        Select Albums to Sync
      </Button>
      <Button variant="contained"
        onClick={() => {
          clearAlbums();
          setSyncState({...syncState, allAlbums: true, completed: false})
          navigate('/sync')
        }}>
        Sync All Albums
      </Button>
    </Container>
  ) : null;
};
