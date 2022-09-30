import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { styled } from "@mui/material";
import { Confirmation } from "src/pages/ConfirmSync";
import { Landing } from "src/pages/Landing";
import { Login } from "src/pages/Login";
import { SyncResults } from "src/pages/SyncResults";
import { RequireAuth } from "./components/RequireAuth";
import { LoggedInRedirect } from "./pages/LoggedInRedirect";
import { SelectAlbums } from "./pages/SelectAlbums";

const queryClient = new QueryClient();

const AppContainer = styled("div")`
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
                    <SelectAlbums />
                  </RequireAuth>
                }
              />
              <Route
                path="/sync"
                element={
                  <RequireAuth>
                    <Confirmation />
                  </RequireAuth>
                }
              />
              <Route
                path="/sync-results"
                element={
                  <RequireAuth>
                    <SyncResults />
                  </RequireAuth>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/loggedin" element={<LoggedInRedirect />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </AppContainer>
    </CssBaseline>
  );
};
