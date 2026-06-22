import React, { useEffect, useState } from "react";
import s from "../Pages/shared.module.css";
import {
  BtnCancel,
  BtnEdit,
  BtnEliminar,
  BtnSave,
  BtonCrear,
} from "../Components/component";
import { ErrorAlert } from "../Components/UI/ErrorAlert";
import { ListarCuentasPuc, BuscadorCuentasPuc } from "../Api/ConfCuentasPuc";
import { type ConfCuentasPucResponse } from "../Types/ConfType";
import { useDebounce } from "../Hook/UseDebounce";

export default function ConfCuentasPuc() {
  const emptyCuentaPuc: ConfCuentasPucResponse = {
    cuentasPucID: 0,
    cuentasPucCodigo: "",
    cuentaPucNombre: "",
    cuentaPucNaturaleza: "",
    cuentaPucMovimiento: 0,
    cuentaPucTercero: 0,
    cuentaPucTipo: 0,
  };
  const [formState, setFormState] = useState<"edicion" | "lectura">("lectura");
  const [alert, setAlert] = useState<{
    message: string;
    type: "error" | "success" | "warning";
  } | null>(null);
  const [listaCuenta, setListaCuenta] = useState<ConfCuentasPucResponse[]>([]);
  const [cuentaSelected, setCuentaSelected] = useState(emptyCuentaPuc);
  const [filtro, setFiltro] = useState<string>("");
  const filtroDebounced = useDebounce<string>(filtro, 400);

  const changedCuentasPuc = async () => {
    try {
      const CuentasPuc = await ListarCuentasPuc();
      setListaCuenta(CuentasPuc);
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    changedCuentasPuc();
  }, []);

  useEffect(() => {
    const ejecutarBusqueda = async () => {
      if (filtroDebounced.trim() === "") {
        await changedCuentasPuc();
      } else {
        const data = await BuscadorCuentasPuc(filtroDebounced);
        setListaCuenta(data);
      }
    };
    ejecutarBusqueda();
  }, [filtroDebounced]);

  const HandleChanged = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setCuentaSelected((prev) => ({
      ...prev,
      [name]:
        name === "cuentaPucMovimiento" ||
        name === "cuentaPucTercero" ||
        name === "cuentasPucID" ||
        name === "cuentaPucTipo"
          ? Number(value)
          : value.toUpperCase(),
    }));
  };

  //handled
  const handleCreate = () => {
    setCuentaSelected(emptyCuentaPuc);
    setFormState("edicion");
  };

  const handleEdit = () => {
    setFormState("edicion");
  };
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
            <div className={s.formRow}>
              <label className={s.label}>Codigo Cuenta</label>
              <input
                className={s.input}
                value={cuentaSelected.cuentasPucCodigo}
                onChange={HandleChanged}
                name="cuentasPucCodigo"
              ></input>
            </div>

            <div className={s.formRow}>
              <label className={s.label}>Nombre cuenta</label>
              <input
                className={s.input}
                value={cuentaSelected.cuentaPucNombre}
                onChange={HandleChanged}
                name="cuentaPucNombre"
              ></input>
              <label className={s.label}>Naturalesza</label>
              <input
                style={{ width: "40px" }}
                className={s.input}
                value={cuentaSelected.cuentaPucNaturaleza}
                onChange={HandleChanged}
                name="cuentaPucNaturaleza"
              ></input>
            </div>

            <div className={s.formRow}>
              <label className={s.label}>¿Permite Movimiento?</label>
              <select
                className={s.select}
                value={cuentaSelected.cuentaPucMovimiento}
                onChange={HandleChanged}
                name="cuentaPucMovimiento"
              >
                <option value={0}>NO</option>
                <option value={1}>SI</option>
              </select>

              <label className={s.label}>¿Guarda Tercero?</label>
              <select
                className={s.select}
                value={cuentaSelected.cuentaPucTercero}
                onChange={HandleChanged}
                name="cuentaPucTercero"
              >
                <option value={0}>NO</option>
                <option value={1}>SI</option>
              </select>
            </div>
          </fieldset>

          <div className={s.buttonGroup} style={{ margin: "10px" }}>
            <button
              className={`${s.btn} ${s.btnPrimary}`}
              disabled={formState === "edicion"}
              onClick={handleCreate}
            >
              <BtonCrear />
            </button>
            <button
              className={`${s.btn} ${s.btnEdit}`}
              disabled={formState === "edicion"}
              onClick={handleEdit}
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
            <input
              className={s.search}
              placeholder="Buscar..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>

          <div className={s.tableWrapper}>
            <table
              className={`${s.table} ${formState === "edicion" ? s.disabledTable : ""}`}
            >
              <thead>
                <tr>
                  <th>Código</th>
                  <th className={s.alignLeft}>Nombre</th>
                </tr>
              </thead>
              <tbody>
                {listaCuenta.map((d, i) => (
                  <tr
                    key={i}
                    onDoubleClick={() => setCuentaSelected(d)}
                    className={
                      cuentaSelected.cuentasPucID == d.cuentasPucID
                        ? s.selectedRow
                        : ""
                    }
                  >
                    <td className={s.alignLeft}>{d.cuentasPucCodigo}</td>
                    <td className={s.alignLeft}>{d.cuentaPucNombre}</td>
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
