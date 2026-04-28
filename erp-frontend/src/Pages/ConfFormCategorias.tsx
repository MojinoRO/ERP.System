import s from "./shared.module.css";
import { type CategoriasResponse } from "../Types/ConfCategorias";
import { useEffect, useRef, useState } from "react";
import { getAllCategorias, getByCodigo } from "../Api/ConfCategoriasService";
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

  const [form, setForm] = useState(false);
  const [listaCategorias, setListaCategorias] = useState<CategoriasResponse[]>([]);
  const [catagoriaSelected, setCategoriaSelected] = useState<CategoriasResponse | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = (c:CategoriasResponse)=>{
    if(!c.categoriaCodigo?.trim()){
      alert("Codigo Categoria necesario");
      return false;
    }
    return true;
  }

  const validateCodigo= async()=>{
    try{
      if(!validate(catagoriaSelected!)) return;
      console.log(catagoriaSelected?.categoriaCodigo);
      const  ok = await getByCodigo(catagoriaSelected!.categoriaCodigo);
      if(ok){
        alert("codigo ya existe");
        inputRef.current?.focus();
        return;
      }
    }catch(error:any){
      console.log(error);
    }
  }

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
    setCategoriaSelected({
      categoriasID:0,
      categoriaCodigo:"",
      categoriaNombre:"",
      impuestoACargo:0,
      tarifaImpuesto:19,
      estado:0
    });
    setForm(true);
  };

  const handleModificar = () => {
    if (!catagoriaSelected) {
      alert("Seleccione una categoría");
      return;
    }
    setForm(true);
  };

  const handleGuardar = () => {
    // Aquí luego conectas tu API
    setForm(false);
  };

  const handleEliminar = () => {
    if (!catagoriaSelected) {
      alert("Seleccione una categoría");
      return;
    }
    const ok = window.confirm("¿Eliminar categoría?");
    if (!ok) return;

    // Aquí luego conectas tu API
    setCategoriaSelected(null);
  };

  return (
    <div className={s.container}>
      <h2 className={s.pageTitle}>Configuración de Categorías</h2>

      <div className={s.grid}>
        {/* ── Panel izquierdo ── */}
        <div className={s.formulario}>
          
          {/* el formulario bloqueado automáticamente */}
          <fieldset disabled={!form} className={s.fieldset}>
            
            <h3 className={s.sectionTitle}>Información general</h3>

            <div className={`${s.formRow} ${s.cols2}`}>
              <div className={s.formGroup}>
                <label className={s.label}>Código</label>
                <input className={s.input} placeholder="Cód."
                value={catagoriaSelected?.categoriaCodigo}
                onKeyDown={(e)=>{
                  if(e.key =="Enter"){
                    validateCodigo();
                  }
                }}
                ref={inputRef}
                onChange={(e)=>setCategoriaSelected(prev =>({
                  ...prev!,categoriaCodigo:e.target.value
                }))}/>
              </div>
              <div className={s.formGroup}>
                <label className={s.label}>Nombre</label>
                <input className={s.input} placeholder="Nombre categoría"
                value={catagoriaSelected?.categoriaNombre}
                onChange={(e)=>setCategoriaSelected(prev=>({
                  ...prev!, categoriaNombre :e.target.value.toUpperCase()
                }))}/>
              </div>
            </div>

            <div className={`${s.formRow} ${s.cols2}`}>
              <div className={s.formGroup}>
                <label className={s.label}>Impuesto a cargo</label>
                <select className={s.select}
                  value={catagoriaSelected?.impuestoACargo}>
                  <option value="0">IVA incluido</option>
                  <option value="1">Exento</option>
                  <option value="2">Excluido</option>
                </select>
              </div>
              <div className={s.formGroup}>
                <label className={s.label}>Tarifa IVA (%)</label>
                <input className={s.input} placeholder="0.00" 
                value={catagoriaSelected?.tarifaImpuesto}/>
              </div>
            </div>

            <div className={s.formGroup}>
              <label className={s.label}>Estado</label>
              <select className={s.select}>
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
                        <input className={s.input} placeholder="Nombre cuenta" />
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

          {/* 🔹 Botones (SIEMPRE activos) */}
          <div className={s.buttonGroup}>
            <button className={`${s.btn} ${s.btnPrimary}`} onClick={handleCrear}>
              Crear
            </button>
            <button className={`${s.btn} ${s.btnEdit}`} onClick={handleModificar}>
              Modificar
            </button>
            <button className={`${s.btn} ${s.btnSuccess}`} onClick={handleGuardar}>
              Guardar
            </button>
            <button className={`${s.btn} ${s.btnDanger}`} onClick={handleEliminar}>
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

          <table className={`${s.table} ${form ? s.disabledTable : ""}`}>
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
                      catagoriaSelected?.categoriaCodigo === d.categoriaCodigo
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