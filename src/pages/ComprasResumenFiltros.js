import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import DescargarExcel from "../components/DescargarExcel";
import SlicerAnio from "../components/slicers/SlicerAnio";
import SlicerMes from "../components/slicers/SlicerMes";
import SlicerPagada from "../components/slicers/SlicerPagada";
import SlicerDistrito from "../components/slicers/SlicerDistrito";


function ComprasResumenFiltros({
  filters,
  distritos,
  handleChange,
  handleBuscar,
  handleLimpiar,
  handleShowTable,
  handleShowChart,
  viewMode,
  apiUrl,
}) {
   

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(220px, 1fr))",
            md: "repeat(4, minmax(220px, 1fr))",
          },
          gap: 2,
          mb: 2,
        }}
      >
        

        <TextField
          fullWidth
          label="Proveedor"
          name="proveedor"
          value={filters.proveedor}
          onChange={handleChange}
          size="small"
        />

        {/* TextField
          fullWidth
          size="small"
          label="Proyecto"
          name="proyecto"
          value={filters.proyecto}
          onChange={handleChange}
        /> 

        <TextField
          fullWidth
          size="small"
          label="Subproyecto"
          name="subproyecto"
          value={filters.subproyecto}
          onChange={handleChange}
        /> */}
      </Box>
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 3 }}>
          <SlicerAnio value={filters.anio} onChange={handleChange} />
          <SlicerPagada value={filters.pagada} onChange={handleChange} />
          <SlicerDistrito
            value={filters.distrito}
            onChange={handleChange}
            distritos={distritos}
          />
        </Box>


      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Button variant="contained" onClick={handleBuscar}>
          Buscar
        </Button>

        <Button variant="outlined" onClick={handleLimpiar}>
          Limpiar
        </Button>

        <Button
          variant={viewMode === "table" ? "contained" : "outlined"}
          onClick={handleShowTable}
        >
          Ver tabla
        </Button>

        <DescargarExcel
          apiUrl={apiUrl.replace("compras-resumen-api", "compras-resumen-excel")}
          filters={filters}
        />

        <Button
          variant={viewMode === "chart" ? "contained" : "outlined"}
          onClick={handleShowChart}
        >
          Ver gráfico
        </Button>
      </Box>
    </>
  );
}

export default React.memo(ComprasResumenFiltros);