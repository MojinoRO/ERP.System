import { useEffect, useState } from "react";
import s from "../Pages/shared.module.css";
import {
  BtnCancel,
  BtnEdit,
  BtnEliminar,
  BtnSave,
  BtonCrear,
} from "../Components/component";
import { ErrorAlert } from "../Components/UI/ErrorAlert";
import { ListarCuentasPuc } from "../Api/ConfCuentasPuc";
import { type ConfCuentasPucResponse } from "../Types/ConfType";

export default function ConfCuentasPuc() {
  const [formState, setFormState] = useState<"edicion" | "lectura">("edicion");
  const [alert, setAlert] = useState<{
    message: string;
    type: "error" | "success" | "warning";
  } | null>(null);
  const [listaCuenta, setListaCuenta] = useState<ConfCuentasPucResponse[]>([]);

  const changedCuentasPuc = async () => {
    try {
      const CuentasPuc = await ListarCuentasPuc();
      setListaCuenta(CuentasPuc);
      console.log(CuentasPuc);
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    changedCuentasPuc();
  }, []);
  return (
    <div className={s.container}>
      <h2 className={s.pageTitle}>Configuración Cuentas PUC</h2>
      {alert && (
        <ErrorAlert
          message={alert.message}
          type={alert.type}
          autoClose={3000}
          onClose={() => setAlert(null)}
        ></ErrorAlert>
      )}

      <div className={s.grid}>
        {/* FORMULARIO */}
        <div className={s.formulario}>
          <fieldset className={s.fieldset} disabled={formState !== "edicion"}>
            <h3 className={s.pageTitle}>Información General</h3>

            <div className={s.formRow}>
              <label className={s.label}>Codigo Cuenta</label>
              <input></input>
            </div>

            <div className={s.formRow}>
              <label className={s.label}>Nombre cuenta</label>
              <input></input>
              <label className={s.label}>Naturalesza</label>
              <input style={{ width: "40px" }}></input>
            </div>

            <div className={s.formRow}>
              <label className={s.label}>¿Permite Movimiento?</label>
              <select className={s.select}>
                <option value={0}>NO</option>
                <option value={1}>SI</option>
              </select>

              <label className={s.label}>¿Guarda Tercero?</label>
              <select className={s.select}>
                <option value={0}>NO</option>
                <option value={1}>SI</option>
              </select>
            </div>
          </fieldset>

          <div className={s.buttonGroup} style={{ margin: "10px" }}>
            <button
              className={`${s.btn} ${s.btnPrimary}`}
              disabled={formState === "edicion"}
            >
              <BtonCrear />
            </button>
            <button
              className={`${s.btn} ${s.btnEdit}`}
              disabled={formState === "edicion"}
            >
              <BtnEdit />
            </button>
            <button
              className={`${s.btn} ${s.BtnCancel}`}
              disabled={formState === "lectura"}
            >
              <BtnCancel />
            </button>
            <button
              className={`${s.btn} ${s.btnSuccess}`}
              disabled={formState === "lectura"}
            >
              <BtnSave />
            </button>
            <button
              className={`${s.btn} ${s.btnDanger}`}
              disabled={formState === "edicion"}
            >
              <BtnEliminar />
            </button>
          </div>
        </div>

        {/* LISTADO */}
        <div className={s.list}>
          <div className={s.listHeader}>
            <h3>Listado de Cuentas PUC</h3>
            <input className={s.search} placeholder="Buscar..." />
          </div>

          <div className={s.tableWrapper}>
            <table
              className={`${s.table} ${formState === "edicion" ? s.disabledTable : ""}`}
            >
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                {listaCuenta.map((d, i) => (
                  <tr key={i}>
                    <td>{d.cuentasPucCodigo}</td>
                    <td>{d.cuentaPucNombre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
