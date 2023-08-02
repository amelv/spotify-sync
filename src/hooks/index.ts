import axios from "axios";
import process from "process";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHydration, useStore } from "src/store";
import shallow from "zustand/shallow";

export const getSpotifyAuthURL = () => {
  const client_id = process.env.REACT_APP_CLIENT_ID?.toString() ?? '';
  const redirect_uri = process.env.REACT_APP_REDIRECT_URI?.toString() ?? '';
  const state = Math.ceil(Math.random() * 16).toString(); 

  localStorage.setItem('state', state);
  const scope = `user-modify-playback-state
      user-read-playback-state
      user-read-currently-playing
      user-library-modify
      user-library-read
      user-top-read
      playlist-read-private
      playlist-modify-public`;

  let url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(client_id);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
  url += '&state=' + encodeURIComponent(state);
  return url;
}

/**
 * Custom hook that refreshes the access token when it expires.
 */
export const useTokenRefresh = () => {
  const isHydrated = useHydration();
  const { access, expiresIn, expiresAt } = useStore(
    (store) => store.tokens,
    shallow
  );
  const dispatchTokensAction = useStore((store) => store.dispatchTokensAction);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isHydrated || !expiresAt) {
      return;
    }
    /*
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
   */

    if (!access || (expiresAt && Date.now() >= expiresAt.getTime())) {
      navigate('/login'); 
    }
  }, [access, expiresIn, expiresAt, isHydrated, navigate]);
};
