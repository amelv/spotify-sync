import { startTransition, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { syncSongsFromAlbumsRequest } from "src/api-services";
import { useHydration, useStore } from "src/store";

export const useSyncRequest = () => {
  const isHydrated = useHydration();
  const accessToken = useStore((store) => store.tokens.access);
  const selectedAlbums = useStore((store) => store.selectedAlbums);
  const syncState = useStore((store) => store.syncState);
  const setSyncState = useStore((store) => store.setSyncState);
  const navigate = useNavigate();
  const [status, setStatus] = useState("start");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isHydrated || status !== "start") {
      return;
    }

    if (!syncState.type) {
      navigate("/");
    }

    let requestIsCancelled = false;

    const makeSyncRequest = async () => {
      if (syncState.completed) {
        return Promise.resolve();
      }
      setStatus("loading");
      try {
        await syncSongsFromAlbumsRequest(
          accessToken,
          syncState.type ?? "save",
          setProgress,
          syncState.allAlbums ? undefined : selectedAlbums
        );
        if (!requestIsCancelled) {
          startTransition(() => {
            setStatus("success");
            setProgress(1);
            setSyncState({ ...syncState, completed: true });
          });
        }
      } catch (error) {
        if (!requestIsCancelled) {
          startTransition(() => {
            setStatus("error");
          });
        }
      }
    };

    if (status === "start") {
      startTransition(() => {
        makeSyncRequest();
      });
    }

    return () => {
      requestIsCancelled = true;
    };
  }, [
    accessToken,
    selectedAlbums,
    syncState,
    isHydrated,
    status,
    setSyncState,
  ]);
  return { status, progress };
};
