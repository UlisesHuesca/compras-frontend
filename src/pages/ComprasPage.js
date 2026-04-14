import React, { useEffect, useState } from "react";

const API_URL = "/api/compras_api";

export default function ComprasPage() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(50);
  const [total, setTotal] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCompras = async () => {
    try {
      setLoading(true);

      //const token = "07b6f65dde961d3090fdf91eba97db062fd3cd66";

      const response = await fetch(
        `${API_URL}?page=${page}&per_page=${perPage}`,
        {
          headers: {
             "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Error al cargar datos");
      }

      const data = await response.json();

      setRows(data.results);
      setTotal(data.total);
      setHasNext(data.has_next);
      setHasPrevious(data.has_previous);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompras();
  }, [page]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Compras</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {/* TABLA */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr style={{ background: "#f4f4f4" }}>
                <th>Folio</th>
                <th>Req</th>
                <th>Solicitud</th>
                <th>Distrito</th>
                <th>Proyecto</th>
                <th>Subproyecto</th>
                <th>Proveedor</th>
                <th>Fecha</th>
                <th>Costo</th>
                <th>Monto Pagado</th>
                <th>Moneda</th>
                <th>Pagada</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr key={row.folio}>
                  <td>{row.folio}</td>
                  <td>{row.folio_req}</td>
                  <td>{row.folio_solicitud}</td>
                  <td>{row.distrito}</td>
                  <td>{row.proyecto}</td>
                  <td>{row.subproyecto}</td>
                  <td>{row.proveedor_nombre}</td>
                  <td>{row.created_at}</td>
                  <td>{row.costo_oc}</td>
                  <td>{row.monto_pagado}</td>
                  <td>{row.moneda_nombre}</td>
                  <td>{row.pagada ? "Sí" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINACIÓN */}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <button
              disabled={!hasPrevious}
              onClick={() => setPage((p) => p - 1)}
            >
              Anterior
            </button>

            <span>Página {page}</span>

            <button
              disabled={!hasNext}
              onClick={() => setPage((p) => p + 1)}
            >
              Siguiente
            </button>

            <span>Total: {total}</span>
          </div>
        </>
      )}
    </div>
  );
}