import s from "../Pages/shared.module.css";
import {
  BtonCrear,
  BtnEdit,
  BtnCancel,
  BtnSave,
  BtnEliminar,
} from "../Components/component";
import { useState } from "react";

export default function ConfFormRutas() {
  const [formState, setFormState] = useState<"edicion" | "lectura">("lectura");
  return (
    <div className={s.container}>
      <h2 className={s.pageTitle}>Configuración de Rutas</h2>

      <div className={s.grid}>
        {/* FORMULARIO */}
        <div className={s.formulario}>
          <fieldset className={s.fieldset}>
            <h3 className={s.sectionTitle}>Información General</h3>

            <div className={s.formRow}>{/* Controles */}</div>

            <div className={s.formRow}>{/* Controles */}</div>
          </fieldset>

          <div className={s.buttonGroup} style={{ margin: "10px" }}>
            <button className={`${s.btn} ${s.btnPrimary}`}>
              <BtonCrear />
            </button>
            <button className={`${s.btn} ${s.btnEdit}`}>
              <BtnEdit />
            </button>
            <button className={`${s.btn} ${s.btnSuccess}`}>
              <BtnSave />
            </button>
            <button className={`${s.btn} ${s.BtnCancel}`}>
              <BtnCancel />
            </button>
            <button className={`${s.btn} ${s.btnDanger}`}>
              <BtnEliminar />
            </button>
          </div>
        </div>

        {/* LISTADO */}
        <div className={s.list}>
          <div className={s.listHeader}>
            <h3>Listado de Registros</h3>

            <input className={s.search} placeholder="Buscar..." />
          </div>

          <div className={s.tableWrapper}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Estado</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
