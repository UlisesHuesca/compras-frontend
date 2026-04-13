import React from "react";
import { Box, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";

const meses = [
  { value: "", label: "Todos" },
  { value: "1", label: "Ene" },
  { value: "2", label: "Feb" },
  { value: "3", label: "Mar" },
  { value: "4", label: "Abr" },
  { value: "5", label: "May" },
  { value: "6", label: "Jun" },
  { value: "7", label: "Jul" },
  { value: "8", label: "Ago" },
  { value: "9", label: "Sep" },
  { value: "10", label: "Oct" },
  { value: "11", label: "Nov" },
  { value: "12", label: "Dic" },
];

export default function SlicerMes({ value, onChange }) {
  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
        Mes
      </Typography>

      <ToggleButtonGroup
        value={String(value ?? "")}
        exclusive
        onChange={(event, newValue) => {
          if (newValue !== null) {
            onChange({
              target: {
                name: "mes",
                value: newValue,
              },
            });
          }
        }}
        size="small"
        sx={{ flexWrap: "wrap", gap: 1 }}
      >
        {meses.map((mes) => (
          <ToggleButton key={mes.value || "todos"} value={mes.value}>
            {mes.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}