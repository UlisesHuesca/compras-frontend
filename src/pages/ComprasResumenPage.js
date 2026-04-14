import React, { useEffect, useState, useCallback } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import ComprasResumenFiltros from "./ComprasResumenFiltros";
import ComprasResumenTabla from "./ComprasResumenTabla";
import ComprasResumenChart from "./ComprasResumenChart";
import logoSavia from "../assets/SAVIA_Logo.jpg";

const API_URL = "/api/compras-resumen-api/";
const DISTRITOS_API_URL = "/api/distritos_api";
const CHART_API_URL = "/api/compras-resumen-chart-proveedores/";


export default function ComprasResumenPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [distritos, setDistritos] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  //const navigate = useNavigate();

  const [viewMode, setViewMode] = useState("table");
  const [chartData, setChartData] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);

  const [filters, setFilters] = useState({
    distrito: "",
    proveedor: "",
    proyecto: "",
    subproyecto: "",
    anio: "",
    mes: "",
    pagada: "",
  });

  const fetchResumen = useCallback(async (activeFilters = filters) => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      Object.entries(activeFilters).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          params.append(key, value);
        }
      });
      const url = `${API_URL}?${params.toString()}`;
      console.log("🟢 URL:", url);
      
      const response = await fetch(`${API_URL}?${params.toString()}`, {
        
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("No se pudo cargar el resumen");
      }

      const data = await response.json();
      setRows(data);
      setExpandedRows({});
    } catch (err) {
      console.error(err);
      setError("Error al cargar el resumen");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchChart = useCallback(async (activeFilters = filters) => {
    try {
      setChartLoading(true);
      setError("");

      const params = new URLSearchParams();

      Object.entries(activeFilters).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          params.append(key, value);
        }
      });

      const response = await fetch(`${CHART_API_URL}?${params.toString()}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("No se pudo cargar el gráfico");
      }

      const data = await response.json();
      setChartData(data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar el gráfico");
    } finally {
      setChartLoading(false);
    }
  }, [filters]);

  const fetchDistritos = useCallback(async () => {
    try {
      const response = await fetch(DISTRITOS_API_URL, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error cargando distritos");
      }

      const data = await response.json();
      setDistritos(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchResumen();
    fetchDistritos();
  }, [fetchResumen, fetchDistritos]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleBuscar = useCallback(() => {
    if (viewMode === "table") {
      fetchResumen(filters);
    } else {
      fetchChart(filters);
    }
  }, [viewMode, fetchResumen, fetchChart, filters]);

  const handleLimpiar = useCallback(() => {
    const resetFilters = {
      distrito: "",
      proveedor: "",
      proyecto: "",
      subproyecto: "",
      anio: "",
      mes: "",
      pagada: "",
    };

    setFilters(resetFilters);

    if (viewMode === "table") {
      fetchResumen(resetFilters);
    } else {
      fetchChart(resetFilters);
    }
  }, [viewMode, fetchResumen, fetchChart]);

  const toggleRow = useCallback((proveedorId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [proveedorId]: !prev[proveedorId],
    }));
  }, []);

  

const handleShowTable = useCallback(() => {
  setViewMode("table");
}, []);

const handleShowChart = useCallback(() => {
  setViewMode("chart");
  fetchChart(filters);
}, [fetchChart, filters]);

useEffect(() => {
  if (viewMode === "chart") {
    fetchChart(filters);
  }
}, [filters, viewMode, fetchChart]);

  return (
    <>
      <Paper sx={{ p: 0, borderRadius: 3, mb: 3, overflow: "hidden" }}>
        <Box
          sx={{
            backgroundColor: "secondary.main",
            color: "secondary.contrastText",
            px: { xs: 2, md: 3 },
            py: { xs: 1.5, md: 2 },
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 1.5,
          }}
        >
          <Box
            component="img"
            src={logoSavia}
            alt="Logo SAVIA"
            sx={{
              height: { xs: 60, md: 48 },
              width: "auto",
              
              borderRadius: 1,
              p: 0.5,
            }}
          />

          <Typography 
            sx= {{
              color: "white", 
              fontWeight: 700,
              fontSize: { xs: "1.05rem", sm: "1.6rem", md: "2rem" }, 
              lineHeight: 1.15,
               }}>
            Resumen de Compras | Solo proveedores de servicios
          </Typography>
        </Box>

        <Box sx={{ p: 3 }}>
          <ComprasResumenFiltros
            filters={filters}
            distritos={distritos}
            handleChange={handleChange}
            handleBuscar={handleBuscar}
            handleLimpiar={handleLimpiar}
            handleShowTable={handleShowTable}
            handleShowChart={handleShowChart}
            viewMode={viewMode}
            apiUrl={API_URL}
          />
        </Box>
      </Paper>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

     {viewMode === "table" && loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {viewMode === "table" && !loading && !error && (
        <ComprasResumenTabla
          rows={rows}
          expandedRows={expandedRows}
          toggleRow={toggleRow}
        />
      )}

      {viewMode === "chart" && chartLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {viewMode === "chart" && !chartLoading && !error && (
        <ComprasResumenChart data={chartData} />
      )}



    </>
  );
}