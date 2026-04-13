import React from "react";
import { Box, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function SlicerDistrito({ value, onChange, distritos = [] }) {
  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
        Distrito
      </Typography>

      <ToggleButtonGroup
        value={value ?? ""}
        exclusive
        onChange={(event, newValue) => {
          if (newValue !== null) {
            onChange({
              target: {
                name: "distrito",
                value: newValue,
              },
            });
          }
        }}
        size="small"
        sx={{ flexWrap: "wrap", gap: 1 }}
      >
        <ToggleButton value="">Todos</ToggleButton>

        {distritos.map((d) => (
          <ToggleButton key={d.id} value={d.nombre}>
            {d.nombre}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}