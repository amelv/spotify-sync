import { startTransition, useEffect, useState } from "react";
import { useQuery } from "react-query";
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
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (!syncState.type) {
      navigate("/");
    }
  }, [navigate, isHydrated]);
  return {
    ...useQuery(
      [Array.from(selectedAlbums.keys()).join(""), syncState.completed],
      {
        queryFn: async () => {
          try {
            await syncSongsFromAlbumsRequest(
              accessToken,
              syncState.type ?? "save",
              setProgress,
              syncState.allAlbums ? undefined : selectedAlbums
            );
            startTransition(() => {
              setProgress(1);
              setSyncState({ ...syncState, completed: true });
            });
          } catch (error) {
            Promise.reject(error);
          }
        },
        enabled: isHydrated && !syncState.completed,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
      }
    ),
    progress,
  };
};
