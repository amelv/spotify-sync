import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter, Route, Routes } from "react-router-dom";

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
import { Footer } from "./components/Footer";
import { LoggedInRedirect } from "./pages/LoggedInRedirect";
import { SelectAlbums } from "./pages/SelectAlbums";


/**
 * The query client is used to cache data from the Spotify API.
 */
const queryClient = new QueryClient();

const AppContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(#282828, #121212);
  padding: 4rem 1rem 0 1rem;
  min-height: 100vh;
  max-width: 100vw;
  @media (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    padding: 2rem 0.5rem 0 0.5rem;
  }
`;

/**
 * The theme for the app. It is responsive, and 
 * uses the Spotify green as the primary color.
 */
const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#1DB954",
      },
      secondary: { main: "#191414" },
      background: {
        default: "linear-gradient(#121212, #181818)",
        paper: "#181818",
      },
      info: {
        main: "#FFFFFF",
      },
      text: {
        primary: "#FFFFFF",
        secondary: "#B3B3B3",
        disabled: "#747474",
      },
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
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Helvetica Neue"',
        "Roboto",
        "Arial",
      ].join(","),
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

/**
 * This is the root of the app.
 * It contains the theme, routing, and query client. It also
 * contains the footer, which is always visible.
 */
export const App = () => {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContainer>
          <QueryClientProvider client={queryClient}>
            <HashRouter>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/select-albums" element={<SelectAlbums />} />
                <Route path="/sync" element={<Confirmation />} />
                <Route path="/sync-results" element={<SyncResults />} />
                <Route path="/login" element={<Login />} />
                <Route path="/loggedin" element={<LoggedInRedirect />} />
              </Routes>
            </HashRouter>
            <Footer />
          </QueryClientProvider>
        </AppContainer>
      </ThemeProvider>
    </StrictMode>
  );
};
