"use client";

import { syncSongsFromAlbumsRequest } from "@/api-services";
import { getSessionToken } from "@/lib/utils";
import { useStore } from "@/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { useQuery } from "react-query";

/**
 * A hook that syncs the songs from the selected albums.
 *
 * @returns
 */
export const useSyncRequest = () => {
  const { data: session } = useSession();
  const accessToken = getSessionToken(session)?.accessToken;

  const selectedAlbums = useStore((store) => store.selectedAlbums);
  const syncState = useStore((store) => store.syncState);
  const setSyncState = useStore((store) => store.setSyncState);
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!syncState.type) {
      router.push("/");
    }
  }, [router, syncState.type]);

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
        enabled: !syncState.completed,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
      }
    ),
    progress,
  };
};
