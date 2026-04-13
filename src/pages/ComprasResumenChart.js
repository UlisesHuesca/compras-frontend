import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function ComprasResumenChart({ data = [] }) {
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        Top proveedores por monto total
      </Typography>

      {data.length > 0 ? (
        <Box sx={{ width: "100%", height: 520 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 120, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                tickFormatter={(value) => formatCompactMoney(value)}
              />
              <YAxis
                type="category"
                dataKey="label"
                width={260}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value) => formatMoney(value)}
                labelFormatter={(label) => `Proveedor: ${label}`}
              />
              <Bar dataKey="monto_total" radius={[0, 6, 6, 0]}>
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      ) : (
        <Typography align="center">
          No hay datos para mostrar con los filtros actuales.
        </Typography>
      )}
    </Paper>
  );
}

function formatMoney(value) {
  const number = Number(value || 0);
  return number.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });
}

function formatCompactMoney(value) {
  const number = Number(value || 0);

  if (number >= 1_000_000) {
    return `$${(number / 1_000_000).toFixed(1)}M`;
  }

  if (number >= 1_000) {
    return `$${(number / 1_000).toFixed(0)}K`;
  }

  return `$${number.toFixed(0)}`;
}

export default React.memo(ComprasResumenChart);