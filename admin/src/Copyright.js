import React from "react";
import { Link, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme2 } from "./App";
export function Copyright() {
  return (
    <ThemeProvider theme={theme2}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          Bitcamp
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </ThemeProvider>
  );
}
