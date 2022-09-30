import { ReactElement, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTokenRefresh } from "src/hooks";

import { useHydration, useStore } from "src/store";

export const RequireAuth = ({ children }: { children: ReactElement }) => {
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

  return children;
};
