import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import CssBaseline from "@mui/material/CssBaseline";

import "./index.css";
import { RequireAuth } from "./components/RequireAuth";
import { Landing } from "./components/Landing";
import { Login } from "./components/Login";
import { UserLoggedIn } from "./components/UserLoggedIn";

const queryClient = new QueryClient();

const AppContainer = styled.div`
  background-color: #cdc6ff;
`;

export const App = () => {
  return (
    <CssBaseline>
      <AppContainer>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Landing />
                  </RequireAuth>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/loggedin" element={<UserLoggedIn />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </AppContainer>
    </CssBaseline>
  );
};
