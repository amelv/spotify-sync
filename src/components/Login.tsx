import { Container, Button, Link } from "@mui/material";

export const Login = () => {
  return (
    <Container>
      <Button
        variant="contained"
        component={Link}
        href="http://localhost:8888/api/login"
      >
        Login into spotify.
      </Button>
    </Container>
  );
};
