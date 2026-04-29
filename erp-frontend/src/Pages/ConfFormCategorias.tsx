import s from "./shared.module.css";
import { type CategoriasResponse } from "../Types/ConfCategorias";
import { useEffect, useState } from "react";
import {
  CreateCategoria,
  deleteCategorias,
  getAllCategorias,
  getByCodigo,
  updateCategorias,
} from "../Api/ConfCategoriasService";

const CUENTAS = [
  { label: "Ingresos" },
  { label: "Devoluciones venta" },
  { label: "Costo (14)" },
  { label: "Costo (61)" },
  { label: "Compras" },
  { label: "Dev. compras" },
  { label: "IVA ventas" },
  { label: "IVA compras" },
] as const;

export default function ConfFormCategorias() {
  const NATURALEZA_OPTIONS = ["C", "D"] as const;
  const emptyCategoria: CategoriasResponse = {
    categoriaID: 0,
    categoriaCodigo: "",
    categoriaNombre: "",
    impuestoACargo: 0,
    tarifaImpuesto: 19,
    estado: 0,
  };
  const [listaCategorias, setListaCategorias] = useState<CategoriasResponse[]>(
    [],
  );
  const [categoriaSelected, setCategoriaSelected] = useState(emptyCategoria);
  const [btnState, setBtnState] = useState<"lectura" | "creando">("lectura");

  const validate = (c: CategoriasResponse) => {
    if (!c.categoriaCodigo?.trim()) {
      alert("Codigo Categoria necesario");
      return false;
    }
    if (!c.categoriaNombre?.trim()) {
      alert("Nombre de la Categoria necesario");
      return false;
    }
    return true;
  };

  const validateCodigo = async (): Promise<boolean> => {
    try {
      const codigo = categoriaSelected.categoriaCodigo?.trim();
      if (!codigo) return false;

      const existe = await getByCodigo(codigo);

      if (existe) {
        const duplicado = listaCategorias.some(
          (x) =>
            x.categoriaCodigo === codigo &&
            x.categoriaID !== categoriaSelected.categoriaID,
        );

        if (duplicado) {
          alert("Código ya existe, no se puede continuar");
          return false; // BLOQUEA
        }
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  // 🔹 Cargar categorías
  const changedCategorias = async () => {
    try {
      const data = await getAllCategorias();
      setListaCategorias(data);
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    changedCategorias();
  }, []);

  // 🔹 Botones (modo ERP)
  const handleCrear = () => {
    setCategoriaSelected(emptyCategoria);
    setBtnState("creando");
  };

  const handleModificar = () => {
    if (categoriaSelected.categoriaID === 0) {
      alert("Debe seleccionar categoría a Modificar");
      return;
    }
    setBtnState("creando");
  };

  const handleGuardar = async () => {
    try {
      if (!categoriaSelected) return alert("No hay datos para guardar");
      if (!validate(categoriaSelected)) return;

      const codigoOk = await validateCodigo();
      if (!codigoOk) return;

      const isNew = categoriaSelected.categoriaID === 0;

      const ok = isNew
        ? await CreateCategoria(categoriaSelected)
        : await updateCategorias(categoriaSelected);

      const accion = isNew ? "crear" : "actualizar";

      alert(
        ok
          ? `Categoría ${accion}da correctamente`
          : `Error al ${accion} categoría`,
      );

      if (ok) {
        setCategoriaSelected(emptyCategoria);
        setBtnState("lectura");
        changedCategorias();
      }
    } catch (error) {
      console.error(error);
      alert("Error inesperado");
    }
  };

  const handleEliminar = async () => {
    try {
      if (!categoriaSelected || !categoriaSelected.categoriaID) {
        alert("Seleccione una categoría válida");
        return;
      }
      const ok = window.confirm("¿Eliminar categoría?");
      if (!ok) return;
      const eliminar = await deleteCategorias(categoriaSelected);
      if (!eliminar) {
        alert("No se pudo eliminar categoria");
      } else {
        alert("Categoria Eliminada correctamente");
      }
      await changedCategorias();
      setCategoriaSelected(emptyCategoria);
      setBtnState("lectura");
    } catch (error: any) {
      console.log(error?.response?.data || error.message);
    }
  };

  return (
    <div className={s.container}>
      <h2 className={s.pageTitle}>Configuración de Categorías</h2>

      <div className={s.grid}>
        {/* ── Panel izquierdo ── */}
        <div className={s.formulario}>
          {/* el formulario bloqueado automáticamente */}
          <fieldset disabled={btnState === "lectura"} className={s.fieldset}>
            <h3 className={s.sectionTitle}>Información general</h3>

            <div className={`${s.formRow} ${s.cols2}`}>
              <div className={s.formGroup}>
                <label className={s.label}>Código</label>
                <input
                  className={s.input}
                  placeholder="Cód."
                  value={categoriaSelected?.categoriaCodigo}
                  onBlur={async () => {
                    await validateCodigo();
                  }}
                  onChange={(e) =>
                    setCategoriaSelected((prev) => ({
                      ...prev!,
                      categoriaCodigo: e.target.value,
                    }))
                  }
                />
              </div>
              <div className={s.formGroup}>
                <label className={s.label}>Nombre</label>
                <input
                  className={s.input}
                  placeholder="Nombre categoría"
                  value={categoriaSelected?.categoriaNombre}
                  onChange={(e) =>
                    setCategoriaSelected((prev) => ({
                      ...prev!,
                      categoriaNombre: e.target.value.toUpperCase(),
                    }))
                  }
                />
              </div>
            </div>

            <div className={`${s.formRow} ${s.cols2}`}>
              <div className={s.formGroup}>
                <label className={s.label}>Impuesto a cargo</label>
                <select
                  className={s.select}
                  value={categoriaSelected?.impuestoACargo}
                  onChange={(e) =>
                    setCategoriaSelected((prev) => ({
                      ...prev!,
                      impuestoACargo: Number(e.target.value),
                    }))
                  }
                >
                  <option value="0">IVA incluido</option>
                  <option value="1">Exento</option>
                  <option value="2">Excluido</option>
                </select>
              </div>
              <div className={s.formGroup}>
                <label className={s.label}>Tarifa IVA (%)</label>
                <input
                  className={s.input}
                  placeholder="0.00"
                  value={categoriaSelected?.tarifaImpuesto}
                  onChange={(e) =>
                    setCategoriaSelected((prev) => ({
                      ...prev!,
                      tarifaImpuesto: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>

            <div className={s.formGroup}>
              <label className={s.label}>Estado</label>
              <select
                className={s.select}
                value={categoriaSelected.estado}
                onChange={(e) =>
                  setCategoriaSelected((prev) => ({
                    ...prev!,
                    estado: Number(e.target.value),
                  }))
                }
              >
                <option value="0">Activo</option>
                <option value="1">Inactivo</option>
              </select>
            </div>

            <h3 className={s.sectionTitle} style={{ marginTop: 16 }}>
              Cuentas contables
            </h3>

            <div className={s.tableWrapper}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>Cuenta</th>
                    <th>Cód. contable</th>
                    <th>Nombre</th>
                    <th>Naturaleza</th>
                  </tr>
                </thead>
                <tbody>
                  {CUENTAS.map(({ label }) => (
                    <tr key={label}>
                      <td>{label}</td>
                      <td>
                        <input className={s.input} placeholder="Ej. 410505" />
                      </td>
                      <td>
                        <input
                          className={s.input}
                          placeholder="Nombre cuenta"
                        />
                      </td>
                      <td>
                        <select className={s.select}>
                          {NATURALEZA_OPTIONS.map((op) => (
                            <option key={op} value={op}>
                              {op}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <div className={s.buttonGroup}>
            <button
              className={`${s.btn} ${s.btnPrimary}`}
              onClick={handleCrear}
              disabled={btnState !== "lectura"}
              type="button"
            >
              Crear
            </button>
            <button
              className={`${s.btn} ${s.btnEdit}`}
              onClick={handleModificar}
              disabled={btnState !== "lectura"}
            >
              Modificar
            </button>
            <button
              className={`${s.btn} ${s.btnSuccess}`}
              onClick={handleGuardar}
              disabled={btnState !== "creando"}
            >
              Guardar
            </button>
            <button
              className={`${s.btn} ${s.btnDanger}`}
              onClick={handleEliminar}
              disabled={btnState !== "lectura"}
            >
              Eliminar
            </button>
          </div>
        </div>

        {/* ── Panel derecho ── */}
        <div className={s.list}>
          <div className={s.listHeader}>
            <h3>Listado de categorías</h3>
            <input className={s.search} placeholder="Buscar..." />
          </div>

          <table
            className={`${s.table} ${btnState !== "lectura" ? s.disabledTable : ""}`}
          >
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Iva</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {listaCategorias.map((d, i) => (
                <tr
                  key={i}
                  onClick={() => setCategoriaSelected(d)}
                  className={
                    categoriaSelected?.categoriaCodigo === d.categoriaCodigo
                      ? s.selectedRow
                      : ""
                  }
                >
                  <td>{d.categoriaCodigo}</td>
                  <td>{d.categoriaNombre}</td>
                  <td>{d.tarifaImpuesto}</td>
                  <td>{d.estado === 0 ? "Activo" : "Inactivo"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
