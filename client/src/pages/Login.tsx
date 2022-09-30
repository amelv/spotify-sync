import { Button, Container, Link, Typography } from "@mui/material";
import process from "process";
import spotifyIcon from "src/assets/spotify.png";

export const Login = () => {
  return (
    <Container
      sx={{
        maxWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "2.5rem" }}>
        Spotify Albums to Songs Sync
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          width: "300px",
          height: "300px",
          backgroundColor: "black",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <img src={spotifyIcon} height="100px" width="100px" alt="" />
        <Typography
          sx={{ color: "white", textAlign: "center" }}
          variant="body2"
        >
          Please log in to your Spotify account.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          href={process.env.REACT_APP_LOGIN_URI}
        >
          Login into spotify.
        </Button>
      </div>
    </Container>
  );
};
