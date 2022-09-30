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

export const LoggedInRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setTokens = useStore((state) => state.setTokens);
  const isHydrated = useHydration();

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
    const expiresIn = searchParams.get("expires_in");

    if (isHydrated && accessToken && refreshToken && expiresIn) {
      setTokens({
        access: accessToken,
        refresh: refreshToken,
        expiresIn,
        expiresAt: new Date(Date.now() + Number(expiresIn)),
      });

      navigate("/", { replace: true });
    }
  }, [navigate, setTokens, searchParams, isHydrated]);

  return (
    <ContentWrapper>
      <h1>Log in successful</h1>
    </ContentWrapper>
  );
};
