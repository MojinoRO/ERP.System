// Importamos los hooks de React que necesitamos
// useEffect → ejecuta código cuando el componente carga
// useState  → guarda y actualiza datos en memoria
import { use, useEffect, useEffectEvent, useState } from "react";
// Importamos los tipos que definimos en Types/ConfEmpresa.ts
// Esto es como los modelos en C# — definen la forma del objeto
import type {
  ConfEmpresa,
  UpdateConfEmpresa,
  CreateConfEmpresa,
} from "../Types/ConfEmpresa";
// Importamos las funciones que hablan con la API
// Es como inyectar un servicio en C# con dependency injection
import {
  getEmpresas,
  createEmpresa,
  UpdateEmpresa,
  DeleteEmpresa,
} from "../Api/ConfEmpresaService";

// Definimos el componente — es como una clase en C# pero en función
// Todo lo que está dentro del return() es lo que se muestra en pantalla (HTML)
export default function Empresas() {
  // useState es como una propiedad con notificación de cambio en XAML
  // Cuando cambias el valor con setEmpresas(), la pantalla se actualiza sola

  //lista de empreas que vienen desde el backend
  const [empresas, setEmpresas] = useState<ConfEmpresa[]>([]);

  //datos del formulario para crear una Empresa
  const [form, setForm] = useState<CreateConfEmpresa>({
    EmpresaNit: "",
    EmpresaNombre: "",
  });

  // Mensaje de error para mostrar en pantalla
  const [error, setError] = useState<string>("");

  // Controla si el botón muestra "Guardando..." o "Crear"
  const [Loading, setLoading] = useState<boolean>(false);

  //useefect con [] vacio = se ejecuta una sola vez cuando el componente carga
  //es como el contructor en  c# o el loaded en xaml

  useEffect(() => {
    cargarEmpreas();
  }, []); // ← el [] vacío significa "solo al inicio"

  // Función que llama a la API y guarda las empresas en el estado
  const cargarEmpreas = async () => {
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
      setForm({ EmpresaNit: "", EmpresaNombre: "" });

      await cargarEmpreas(); // recarga la lista para mostrar el nuevo registro
    } catch (e: any) {
      setError(e.response?.data || "Error al crear Empresa");
    }
  };
  // Función que se ejecuta cuando el usuario hace clic en "Eliminar"
  const handlerEliminar = async (id: number) => {
    try {
      await DeleteEmpresa(id); // llama DELETE /api/ConfEmpresa/{id}
      await cargarEmpreas();
    } catch {
      setError("Error al Eliminar Empresa");
    }
  };
}
