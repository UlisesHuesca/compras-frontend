import React from "react";
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function ComprasResumenTabla({ rows, expandedRows, toggleRow }) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "secondary.main",
              "& .MuiTableCell-root": {
                color: "secondary.contrastText",
                fontWeight: 700,
              },
            }}
          >
            <TableCell width={60}></TableCell>
            <TableCell>Proveedor</TableCell>
            <TableCell align="right">Total compras</TableCell>
            <TableCell align="right">Monto total</TableCell>
            <TableCell align="right">Monto pagado</TableCell>
            <TableCell align="right">Compras pagadas</TableCell>
            <TableCell align="right">Compras no pagadas</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length > 0 ? (
            rows.map((row, index) => {
              const rowKey = row.proveedor_id ?? index;
              const isExpanded = !!expandedRows[rowKey];
              const productos = Array.isArray(row.productos) ? row.productos : [];

              return (
                <React.Fragment key={rowKey}>
                  <TableRow hover>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => toggleRow(rowKey)}
                        disabled={productos.length === 0}
                      >
                        {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </TableCell>

                    <TableCell>{row.proveedor}</TableCell>
                    <TableCell align="right">{row.total_compras}</TableCell>
                    <TableCell align="right">{formatMoney(row.monto_total)}</TableCell>
                    <TableCell align="right">{formatMoney(row.monto_pagado_total)}</TableCell>
                    <TableCell align="right">{row.compras_pagadas}</TableCell>
                    <TableCell align="right">{row.compras_no_pagadas}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={7} sx={{ py: 0 }}>
                      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <Box sx={{ m: 2 }}>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Producto / Servicio</TableCell>
                                <TableCell align="right">Total OCs</TableCell>
                                <TableCell align="right">Cantidad total</TableCell>
                                <TableCell align="right">Monto total s/IVA</TableCell>
                              </TableRow>
                            </TableHead>

                            <TableBody>
                              {productos.length > 0 ? (
                                productos.map((producto, pIndex) => (
                                  <TableRow key={`${rowKey}-${pIndex}`}>
                                    <TableCell>{producto.producto}</TableCell>
                                    <TableCell align="right">{producto.total_ocs}</TableCell>
                                    <TableCell align="right">
                                      {formatNumber(producto.cantidad_total)}
                                    </TableCell>
                                    <TableCell align="right">
                                      {formatMoney(producto.monto_total)}
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={4} align="center">
                                    Este proveedor no tiene productos para mostrar.
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No hay resultados para los filtros seleccionados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function formatMoney(value) {
  const number = Number(value || 0);
  return number.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });
}

function formatNumber(value) {
  const number = Number(value || 0);
  return number.toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default React.memo(ComprasResumenTabla);