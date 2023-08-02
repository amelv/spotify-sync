import { Container, Typography } from "@mui/material";

/**
 * A simple footer.
 */
export const Footer = () => (
  <Container
    sx={{
      width: "100%",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "auto",
    }}
  >
    <Typography variant="body2">
      Created by{" "}
      <a
        href="http://amelv.github.io/"
        target="_self"
        rel="noopener noreferrer"
      >
        amelv
      </a>
    </Typography>
  </Container>
);
