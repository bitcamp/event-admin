import React from "react";
import "./App.css";
import { CssBaseline, Box, Container } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
import SendAnnouncement from "./components/SendAnnouncement";
import { Copyright } from "./Copyright";

export const theme2 = createMuiTheme({
  palette: {
    primary: orange,
    secondary: {
      main: "#f44336",
    },
  },
});

export default function Main() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <SendAnnouncement />
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
