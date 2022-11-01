import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  styled,
  ThemeProvider,
} from "@mui/material";
import { StrictMode } from "react";
import { Confirmation } from "src/pages/ConfirmSync";
import { Landing } from "src/pages/Landing";
import { Login } from "src/pages/Login";
import { SyncResults } from "src/pages/SyncResults";
import { LoggedInRedirect } from "./pages/LoggedInRedirect";
import { SelectAlbums } from "./pages/SelectAlbums";

const queryClient = new QueryClient();

const AppContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0eeeb;
  min-height: 100vh;
  max-width: 100vw;
`;

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#1DB954",
      },
      secondary: { main: "#191414" },
      error: {
        main: "#ea3434",
      },
      warning: {
        main: "#ffe550",
      },
      action: {
        selectedOpacity: 0.18,
      },
    },
    typography: {
      h1: {
        fontSize: "4rem",
        fontWeight: 500,
      },
      h2: {
        fontSize: "2.75rem",
      },
      h3: {
        fontSize: "2.25rem",
      },
      h4: {
        fontSize: "2rem",
      },
      body1: {
        fontSize: "1.25rem",
      },
      body2: {
        fontSize: "1rem",
      },
      caption: {
        fontSize: "0.875rem",
      },
    },
  })
);

export const App = () => {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContainer>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/select-albums" element={<SelectAlbums />} />
                <Route path="/sync" element={<Confirmation />} />
                <Route path="/sync-results" element={<SyncResults />} />
                <Route path="/login" element={<Login />} />
                <Route path="/loggedin" element={<LoggedInRedirect />} />
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </AppContainer>
      </ThemeProvider>
    </StrictMode>
  );
};
