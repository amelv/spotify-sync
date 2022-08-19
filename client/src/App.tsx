import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import CssBaseline from "@mui/material/CssBaseline";

import "./index.css";
import { RequireAuth } from "./components/RequireAuth";
import { Landing } from "./components/Landing";
import { Login } from "./components/Login";
import { UserLoggedIn } from "./components/UserLoggedIn";
import { Container, styled } from "@mui/material";

const queryClient = new QueryClient();

const AppContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #cdc6ff;
  min-height: 100vh;
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
