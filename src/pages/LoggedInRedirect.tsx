import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useHydration, useStore } from "src/store";
import styled from "styled-components";

const ContentWrapper = styled.main`
  width: 100%;
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
`;

/**
 * Redirects the user to the home page after logging in. Captures the access
 * token, refresh token, and expiration time from the URL search params.
 * @returns 
 */
export const LoggedInRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatchTokensAction = useStore((state) => state.dispatchTokensAction);
  const isHydrated = useHydration();

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const expiresIn = searchParams.get("expires_in");
    const stateKey = searchParams.get("state");

    if (isHydrated && accessToken && expiresIn) {
      dispatchTokensAction({
        type: "set",
        payload: {
          access: accessToken,
          expiresIn,
          expiresAt: new Date(Date.now() + Number(expiresIn)),
        },
      });

      navigate("/", { replace: true });
    }
  }, [navigate, dispatchTokensAction, searchParams, isHydrated]);

  return (
    <ContentWrapper>
      <h1>Log in successful</h1>
    </ContentWrapper>
  );
};
