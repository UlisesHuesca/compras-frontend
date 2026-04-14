import React, { useState } from "react";
import { Container, CssBaseline, Button, Stack, ThemeProvider } from "@mui/material";
import theme from "./theme";
import ComprasResumenPage from "./pages/ComprasResumenPage";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" 
      sx={{ 
        py: { xs: 1.5, sm: 3, md: 4 },
        px: { xs: 1, sm: 2, md: 3 }, 
        }}>
          <ComprasResumenPage />
      </Container>
    </ThemeProvider>
  );
}

export default App;