import React from "react";
import { Box, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function SlicerAnio({ value, onChange }) {
  const currentYear = new Date().getFullYear();
  const anios = Array.from({ length: 5 }, (_, i) => String(currentYear - i));

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
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
      >
        <ToggleButton value="">Todos</ToggleButton>

        {anios.map((anio) => (
          <ToggleButton key={anio} value={anio}>
            {anio}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}