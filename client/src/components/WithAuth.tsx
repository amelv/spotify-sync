import { CircularProgress, Fade } from "@mui/material";
import { Container } from "@mui/system";
import { FunctionComponent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTokenRefresh } from "src/hooks";

import { useHydration, useStore } from "src/store";

const LoadingAccess = () => (
  <Container sx={{ display: "flex", justifyContent: "center" }}>
    <Fade in={true} timeout={300}>
      <CircularProgress size={100} color="primary" />
    </Fade>
  </Container>
);

export const withAuth = (Component: FunctionComponent) => (props: any) => {
  const { access } = useStore((state) => state.tokens);
  const isHydrated = useHydration();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isHydrated && !access) {
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [access, navigate, location, isHydrated]);

  useTokenRefresh();

  return isHydrated ? <Component {...props} /> : <LoadingAccess />;
};
