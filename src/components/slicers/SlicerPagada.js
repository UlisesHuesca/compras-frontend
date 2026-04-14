import React from "react";
import { Box, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function SlicerPagada({ value, onChange }) {
  return (
    <Box
      sx={{
        border: "1px solid #cfd8dc",
        borderRadius: 3,
        backgroundColor: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        p: 1.5,
        minWidth: 150,
        width: "100%",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 700,
          mb: 1.25,
          color: "#111827",
        }}
      >
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
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.75,
          width: "100%",
          "& .MuiToggleButton-root": {
            border: "1px solid #9fb3c8",
            borderRadius: "6px !important",
            px: 1.2,
            py: 0.65,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.88rem",
            color: "#425466",
            backgroundColor: "#ffffff",
          },
          "& .MuiToggleButton-root.Mui-selected": {
            backgroundColor: "#b9cce0",
            color: "#0f172a",
            borderColor: "#7fa1c3",
          },
          "& .MuiToggleButton-root:hover": {
            backgroundColor: "#eef3f8",
          },
        }}
      >
        <ToggleButton value="">TODAS</ToggleButton>
        <ToggleButton value="true">SÍ</ToggleButton>
        <ToggleButton value="false">NO</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}