import { useCallback, useState, useEffect, startTransition } from "react";
import { Button, Container, Typography, Fab, LinearProgress } from "@mui/material";
import { syncSongsFromAlbumsRequest } from "../api-services";
import { useStore, useHydration } from "../store";
import { useNavigate } from "react-router-dom";

export const SyncResults = () => {
  const isHydrated = useHydration()
  const accessToken = useStore((store) => store.tokens.access);
  const selectedAlbums = useStore((store) => store.selectedAlbums);
  const syncState = useStore((store) => store.syncState)
  const setSyncState = useStore((store) => store.setSyncState)
  const navigate = useNavigate();
  const [status, setStatus] = useState('start')
  const [progress, setProgress] = useState(0)
  console.log(progress)

  useEffect(() => {
    if (!isHydrated || status !== 'start') {
        return;
    }

    if (!syncState.type) {
        navigate('/')
    }

    const makeSyncRequest = async () => {
        if (syncState.completed) {
            return Promise.resolve()
        }
        setStatus('loading')
        try {
            await syncSongsFromAlbumsRequest(accessToken, syncState.type ?? 'save', setProgress, syncState.allAlbums ? undefined : selectedAlbums);
            startTransition(() => {
              setStatus('success')
              setProgress(1)
              setSyncState({...syncState, completed: true})
            })
          } catch (error) {
            setStatus('error')
          }
    }
    if (status === 'start') {
      startTransition(() => {
        makeSyncRequest();
      })
    }
  }, [accessToken, selectedAlbums, syncState, isHydrated, status, setSyncState])

  return isHydrated ? (
    <Container sx={{maxWidth: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems:'center', gap: '30px', padding: '20px'}}>
      <Typography variant="h1">Sync</Typography>
      {status}
      {status !== 'start' && <LinearProgress sx={{height: 10, width: '100%', marginTop: 20}} variant="determinate" value={progress * 100} />}
      {status === 'success' && <Button variant="contained" onClick={() => navigate('/')}>Done</Button>}
    </Container>
  ) : null;
};
