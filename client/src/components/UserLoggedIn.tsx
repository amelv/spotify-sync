import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { useStore, useHydration } from "../store";

const ContentWrapper = styled.main`
  width: 100%;
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
`;

export const UserLoggedIn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setTokens = useStore((state) => state.setTokens);
  const isHydrated = useHydration();
  console.log('reach logged in page')
  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get('refresh_token')
    const expiresIn = searchParams.get('expires_in');
    
    if (isHydrated && accessToken && refreshToken && expiresIn) {
      setTokens({access: accessToken, refresh: refreshToken, expiresIn, expiresAt: new Date(Date.now() + Number(expiresIn))})
      console.log('navigating')
      navigate("/", { replace: true });
    }
  }, [navigate, setTokens, searchParams, isHydrated]);

  return isHydrated ? (
    <ContentWrapper>
      <h1>Log in successful</h1>
    </ContentWrapper>
  ) : null;
};
