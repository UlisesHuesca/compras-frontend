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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";

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
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(220px, 1fr))",
            md: "repeat(3, minmax(240px, 1fr))",
          },
          gap: 2,
          mb: 3,
          width: "100%",
        }}
      >
        <SlicerAnio value={filters.anio} onChange={handleChange} />
        <SlicerPagada value={filters.pagada} onChange={handleChange} />
        <SlicerDistrito
          value={filters.distrito}
          onChange={handleChange}
          distritos={distritos}
        />
        
      </Box>


      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {/*<Button variant="contained" onClick={handleBuscar}>
          Buscar
        </Button>*/}

        <Button variant="outlined" onClick={handleLimpiar}>
          Limpiar
        </Button>

        <Button
          variant={viewMode === "table" ? "contained" : "outlined"}
          onClick={handleShowTable}
          sx={{
            color: viewMode === "table" ? "#fff" : "#1f4e79",
            borderColor: "#1f4e79",
            backgroundColor: viewMode === "table" ? "#1f4e79" : "transparent",

            "&:hover": {
              backgroundColor:
                viewMode === "table"
                  ? "#163a5c"
                  : "rgba(31,78,121,0.08)",
              borderColor: "#1f4e79",
              },
            }}
          >
          <FontAwesomeIcon icon={faTable} 
            style={{ fontSize: "1.6rem" }}
          />
          </Button>

          <Button
            variant={viewMode === "chart" ? "contained" : "outlined"}
            onClick={handleShowChart}
            sx={{
              color: viewMode === "chart" ? "#fff" : "#1f4e79",
              borderColor: "#1f4e79",
              backgroundColor: viewMode === "chart" ? "#1f4e79" : "transparent",

              "&:hover": {
                backgroundColor:
                  viewMode === "chart"
                    ? "#163a5c"
                    : "rgba(31,78,121,0.08)",
              },
            }}
          >
            <FontAwesomeIcon icon={faChartBar} style={{ fontSize: "1.6rem" }} />
          </Button>
        <DescargarExcel
          apiUrl={apiUrl.replace("compras-resumen-api", "compras-resumen-excel")}
          filters={filters}
        />
      </Box>
    </>
  );
}

export default React.memo(ComprasResumenFiltros);