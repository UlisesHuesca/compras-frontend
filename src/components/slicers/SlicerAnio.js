import React from "react";
import { Box, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function SlicerAnio({ value, onChange }) {
  const currentYear = new Date().getFullYear();
  const anios = Array.from({ length: 5 }, (_, i) => String(currentYear - i));

  return (
    <Box
      sx={{
        border: "1px solid #cfd8dc",
        borderRadius: 2,
        backgroundColor: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        p: 1.5,
        minWidth: 0,
        width: "100%",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 700,
          mb: 1,
          color: "#1f2937",
        }}
      >
        Año
      </Typography>

      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={(event, newValue) => {
          if (newValue !== null) {
            onChange({
              target: {
                name: "anio",
                value: newValue,
              },
            });
          }
        }}
        size="small"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.75,
          width: "100%",
          "& .MuiToggleButton-root": {
            border: "1px solid #b0bec5",
            borderRadius: "6px !important",
            px: 1.25,
            py: 0.6,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.85rem",
            color: "#455a64",
            backgroundColor: "#f8fafc",
          },
          "& .MuiToggleButton-root.Mui-selected": {
            backgroundColor: "#b7c9dd",
            color: "#0f172a",
            borderColor: "#6b8fb3",
          },
          "& .MuiToggleButton-root:hover": {
            backgroundColor: "#eef3f8",
          },
        }}
      >
        <ToggleButton value="">Todos</ToggleButton>

        {anios.map((anio) => (
          <ToggleButton key={anio} value={String(anio)}>
            {anio}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}