import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { useStore } from "../store";

const ContentWrapper = styled.main`
  width: 100%;
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
`;

export const UserLoggedIn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setAccessToken = useStore((state) => state.setAccessToken);
  console.log("login good");
  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    if (accessToken) {
      setAccessToken(accessToken);
      navigate("/", { replace: true });
    }
  }, [navigate, setAccessToken, searchParams]);

  return (
    <ContentWrapper>
      <h1>Log in successful</h1>
    </ContentWrapper>
  );
};
