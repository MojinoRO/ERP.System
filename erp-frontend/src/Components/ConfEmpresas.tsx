// Importamos los hooks de React que necesitamos
// useEffect → ejecuta código cuando el componente carga
// useState  → guarda y actualiza datos en memoria
import { useEffect, useState } from "react";

// Importamos los tipos que definimos en Types/ConfEmpresa.ts
// Esto es como los modelos en C# — definen la forma del objeto
import type {
  ConfEmpresa,
  CreateConfEmpresa,
} from "../types/ConfEmpresa";

// Importamos las funciones que hablan con la API
// Es como inyectar un servicio en C# con dependency injection
import {
  getEmpresas,
  createEmpresa,
  DeleteEmpresa,
} from "../api/ConfEmpresaService";

// Definimos el componente — es como una clase en C# pero en función
// Todo lo que está dentro del return() es lo que se muestra en pantalla (HTML)
export default function Empresas() {
  // useState es como una propiedad con notificación de cambio en XAML
  // Cuando cambias el valor con setEmpresas(), la pantalla se actualiza sola

  // lista de empresas que vienen desde el backend
  const [empresas, setEmpresas] = useState<ConfEmpresa[]>([]);

  // datos del formulario para crear una Empresa
  const [form, setForm] = useState<CreateConfEmpresa>({
    empresaNit: "",
    empresaNombre: "",
  });

  // Mensaje de error para mostrar en pantalla
  const [error, setError] = useState<string>("");

  // Controla si el botón muestra "Guardando..." o "Crear"
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect con [] vacío = se ejecuta una sola vez cuando el componente carga
  // es como el constructor en C# o el loaded en XAML
  useEffect(() => {
    cargarEmpresas();
  }, []); // ← el [] vacío significa "solo al inicio"

  // Función que llama a la API y guarda las empresas en el estado
  const cargarEmpresas = async () => {
    try {
      const data = await getEmpresas(); // llama GET /api/ConfEmpresa
      setEmpresas(data); // actualiza la lista → pantalla se refresca
    } catch {
      setError("Error al cargar Empresa");
    }
  };

  // Función que se ejecuta cuando el usuario hace clic en "Crear"
  const handlerCrear = async () => {
    try {
      setLoading(true); // cambia botón a "Guardando..."
      setError(""); // limpia errores anteriores

      await createEmpresa(form); // llama POST /api/ConfEmpresa con los datos del form

      // Limpia el formulario después de crear
      setForm({
        empresaNit: "",
        empresaNombre: "",
      });

      await cargarEmpresas(); // recarga la lista para mostrar el nuevo registro
    } catch (e: any) {
      setError(e.response?.data || "Error al crear Empresa");
    } finally {
      setLoading(false);
    }
  };

  // Función que se ejecuta cuando el usuario hace clic en "Eliminar"
  const handlerEliminar = async (id: number) => {
    try {
      await DeleteEmpresa(id); // llama DELETE /api/ConfEmpresa/{id}
      await cargarEmpresas();
    } catch {
      setError("Error al Eliminar Empresa");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Tahoma" }}>
      <h1>DATOS EMPRESA</h1>

      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          gap: "1rem",
        }}
      >
        {/* Input para el NIT
            value={form.EmpresaNit}  → muestra el valor actual del estado
            onChange={...}           → actualiza el estado cuando el usuario escribe
            Es como el Binding bidireccional en XAML (Mode=TwoWay) */}
        <input
          placeholder="Nit:"
          value={form.empresaNit}
          onChange={(e) =>
            setForm({ ...form, empresaNit: e.target.value })
          }
          style={{ padding: "0.5rem", width: "200px" }}
        />

        {/* ...form es el spread operator — copia todos los campos del form
            y solo sobreescribe EmpresaNit con el nuevo valor
            Es como hacer: form.EmpresaNit = e.target.value en C# */}
        <input
          placeholder="EmpresaNombre"
          value={form.empresaNombre}
          onChange={(e) =>
            setForm({ ...form, empresaNombre: e.target.value })
          }
          style={{ padding: "0.5rem", width: "300px" }}
        />

        {/* Botón Crear
            onClick={handleCrear} → ejecuta la función al hacer clic
            disabled={loading}    → desactiva el botón mientras guarda */}
        <button
          onClick={handlerCrear}
          disabled={loading}
          style={{
            padding: "0.5rem 1rem",
            background: "#2E75B6",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {/* Ternario: si loading es true muestra 'Guardando...' sino 'Crear'
              En C#: loading ? 'Guardando...' : 'Crear' */}
          {loading ? "Guardando..." : "Crear"}
        </button>
      </div>

      {/* Muestra el error SOLO si hay mensaje
          {error && ...} = si error no es vacío, muestra el párrafo
          En XAML sería: Visibility={Binding Error, Converter=...} */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Tabla — equivale a un DataGrid en XAML */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ background: "#1F4E79", color: "white" }}>
            <th style={{ padding: "0.75rem", textAlign: "left" }}>
              ID
            </th>
            <th style={{ padding: "0.75rem", textAlign: "left" }}>
              Nit
            </th>
            <th style={{ padding: "0.75rem", textAlign: "left" }}>
              NombreEmpresa
            </th>
            <th style={{ padding: "0.75rem", textAlign: "left" }}>
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {/* .map() recorre la lista y genera una fila por empresa
              Es como un foreach en C# dentro del HTML
              Equivale al ItemsSource de un DataGrid en XAML
              emp = cada empresa, i = índice (0,1,2...) */}
          {empresas.map((emp, i) => (
            <tr
              key={emp.empresaID}
              style={{
                background: i % 2 === 0 ? "#fff" : "#f5f9fc",
              }}
            >
              {/* key es obligatorio — React lo usa para identificar filas */}
              <td style={{ padding: "0.75rem" }}>
                {emp.empresaID}
              </td>

              <td style={{ padding: "0.75rem" }}>
                {emp.empresaNit}
              </td>

              <td style={{ padding: "0.75rem" }}>
                {emp.empresaNombre}
              </td>

              <td style={{ padding: "0.75rem" }}>
                {/* onClick recibe una función flecha que pasa el ID de ESA fila
                    Si pusieramos onClick={handleEliminar(emp.EmpresaID)}
                    se ejecutaría inmediatamente al renderizar, no al hacer clic */}
                <button
                  style={{
                    padding: "0.3rem 0.75rem",
                    background: "#C00000",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handlerEliminar(emp.empresaID)
                  }
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}