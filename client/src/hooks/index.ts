import axios from "axios";
import { useEffect } from "react";
import { useHydration, useStore } from "src/store";
import shallow from "zustand/shallow";

/**
 * Custom hook that refreshes the access token when it expires.
 */
export const useTokenRefresh = () => {
  const isHydrated = useHydration();
  const { access, refresh, expiresIn, expiresAt } = useStore(
    (store) => store.tokens,
    shallow
  );
  const dispatchTokensAction = useStore((store) => store.dispatchTokensAction);

  useEffect(() => {
    if (!isHydrated || !refresh || !expiresAt) {
      return;
    }

    let refreshIsCancelled = false;

    const refreshCallback = async () => {
      try {
        const { data } = await axios({
          url: `${process.env.REACT_APP_REFRESH_URI}?refresh_token=${refresh}`,
          method: "GET",
        });

        if (!refreshIsCancelled && data.access_token) {
          dispatchTokensAction({
            type: "set",
            payload: {
              access: data.access_token,
              refresh,
              expiresIn,
              expiresAt: new Date(Date.now() + (Number(expiresIn) - 60) * 1000),
            },
          });
        }
      } catch (error) {
        if (!refreshIsCancelled && process.env.REACT_APP_LOGIN_URI) {
          window.location.replace(process.env.REACT_APP_LOGIN_URI);
        }
      }
    };

    if (!access || (expiresAt && Date.now() >= expiresAt.getTime())) {
      refreshCallback();
    }
    return () => {
      refreshIsCancelled = true;
    };
  }, [access, refresh, expiresIn, expiresAt, dispatchTokensAction, isHydrated]);
};
