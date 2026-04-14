import React, { useState } from "react";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";

export default function DescargarExcel({ apiUrl, filters, setError }) {
  const [loading, setLoading] = useState(false);

  const handleDescargarExcel = async () => {
    try {
      setLoading(true);

      if (setError) {
        setError("");
      }

      const params = new URLSearchParams();

      Object.entries(filters || {}).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          params.append(key, value);
        }
      });

      const finalUrl = `${apiUrl}?${params.toString()}`;
      console.log("Descargando desde:", finalUrl);

      const response = await fetch(finalUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        },
      );

      console.log("status:", response.status);
      console.log("content-type:", response.headers.get("content-type"));

      if (!response.ok) {
        const text = await response.text();
        console.error("Respuesta no OK:", text);
        throw new Error(`Error al descargar Excel: ${response.status}`);
      }

      const blob = await response.blob();
      console.log("blob size:", blob.size);

      if (blob.size === 0) {
        throw new Error("El archivo llegó vacío");
      }

      const fileURL = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = fileURL;
      a.download = "resumen_compras.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => {
        window.URL.revokeObjectURL(fileURL);
      }, 1000);
    } catch (error) {
      console.error(error);
      if (setError) {
        setError("Error al descargar el Excel");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outlined"
      onClick={handleDescargarExcel}
      disabled={loading}
      sx={{
        borderColor: "#2e7d32",
        color: "#2e7d32",
        "&:hover": {
          borderColor: "#1b5e20",
          backgroundColor: "rgba(46,125,50,0.08)",
        },
      }}
    >
      <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: 8 }} />
      {loading ? "Descargando..." : "Excel"}
    </Button>
  );
}