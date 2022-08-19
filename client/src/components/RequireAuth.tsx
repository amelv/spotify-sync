import { ReactElement, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useStore } from "../store";

export const RequireAuth = ({ children }: { children: ReactElement }) => {
  const token = useStore((state) => state.tokens.access);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [token, navigate, location]);

  return children;
};
