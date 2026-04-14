import React, { useState } from "react";
import { Container, CssBaseline, Button, Stack, ThemeProvider } from "@mui/material";
import theme from "./theme";
import ComprasResumenPage from "./pages/ComprasResumenPage";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 4 }}>
          <ComprasResumenPage />
      </Container>
    </ThemeProvider>
  );
}

export default App;