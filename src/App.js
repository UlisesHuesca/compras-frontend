import React, { useState } from "react";
import { Container, CssBaseline, Button, Stack, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Routes, Route, Navigate } from "react-router-dom";

import ComprasResumenPage from "./pages/ComprasResumenPage";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/compras/resumen" replace />} />
          <Route path="/compras/resumen" element={<ComprasResumenPage />} />
         
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;