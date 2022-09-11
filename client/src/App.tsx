import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import CssBaseline from "@mui/material/CssBaseline";

import "./index.css";
import { RequireAuth } from "./components/RequireAuth";
import { AlbumSelection } from "./components/AlbumSelection";
import { Login } from "./components/Login";
import { UserLoggedIn } from "./components/UserLoggedIn";
import { Container, styled } from "@mui/material";
import { Confirmation } from "./components/Confirmation";
import { Landing } from "./components/Landing";
import { SyncResults } from "./components/SyncResults";

const queryClient = new QueryClient();

const AppContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #cdc6ff;
  min-height: 100vh;
  max-width: 100vw;
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
              <Route
                path="/select-albums"
                element={
                  <RequireAuth>
                    <AlbumSelection />
                  </RequireAuth>
                }
              />
              <Route path="/sync" element={
                <RequireAuth>
                  <Confirmation />
                </RequireAuth>
              } />
              <Route path="/sync-results" element={
                <RequireAuth>
                  <SyncResults />
                </RequireAuth>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/loggedin" element={<UserLoggedIn />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </AppContainer>
    </CssBaseline>
  );
};
