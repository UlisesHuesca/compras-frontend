import React from "react";
import { Box, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function SlicerPagada({ value, onChange }) {
  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
        Pagada
      </Typography>

      <ToggleButtonGroup
        value={String(value ?? "")}
        exclusive
        onChange={(event, newValue) => {
          if (newValue !== null) {
            onChange({
              target: {
                name: "pagada",
                value: newValue,
              },
            });
          }
        }}
        size="small"
      >
        <ToggleButton value="">Todas</ToggleButton>
        <ToggleButton value="true">Sí</ToggleButton>
        <ToggleButton value="false">No</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}