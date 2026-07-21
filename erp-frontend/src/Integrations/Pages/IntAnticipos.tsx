import f from "./InvFormCompraEnBloque.module.css";
import {
  BtonCrear,
  BtnEdit,
  BtnCancel,
  BtnSave,
  BtnEliminar,
} from "../../Components/component";
import s from "../../Pages/shared.module.css";
import { useState } from "react";
import { AutoComplete } from "../../Components/UI/AutoComplete";
import { PageBasic, Field } from "../../Components/UI/pageBasic";
import { DateInput } from "../../Components/UI/DateInput";
import { getproveedores } from "../Api/CompraEnBloque";
import { type Proveedores } from "../Types/Types";
import { CurrencyInput } from "../../Components/UI/CurrencyInput ";
import { ErrorAlert } from "../../Components/UI/ErrorAlert";

export default function IntAnticipos() {
  const emptyProveedor: Proveedores = {
    tercerosID: 0,
    tercerosCelular: "",
    tercerosIdentificacion: "",
    tercerosNombres: "",
    tercerosObservaciones: "",
  };
  const [formState, setFormState] = useState<"lectura" | "edicion">("lectura");
  const [proveedorSelected, setProveedorSelected] =
    useState<Proveedores>(emptyProveedor);
  const [tipoAnticipo, setTipoAnticipo] = useState(0);
  const [fechaAnticipo, setfechaAnticipo] = useState("");
  const [valorAnticipo, setValorAnticipo] = useState(0);
  const [detalleAnticipo, setDetalleAnticipo] = useState("");
  const [alert, SetAlert] = useState<{
    message: string;
    type: "error" | "success" | "warning";
  } | null>(null);

  const HandleCreate = () => {
    if (formState === "lectura") {
      setFormState("edicion");
    }
  };

  function ValidateCampos(): boolean {
    if (proveedorSelected.tercerosID === 0) {
      SetAlert({
        message: "Proveedor Vacio",
        type: "error",
      });
      return false;
    }
    if (fechaAnticipo === "") {
      SetAlert({
        message: "Fecha Requerida",
        type: "error",
      });
      return false;
    }
    if (detalleAnticipo === "") {
      SetAlert({
        message: "Detalle obligatorio",
        type: "error",
      });
      return false;
    }
    if (valorAnticipo <= 0) {
      SetAlert({
        message: "Debe ingresar Valor del anticipo",
        type: "error",
      });
      return false;
    }
    return true;
  }
  const HandleSave = () => {
    if (!ValidateCampos()) return;

    const payload = {
      tercerosID: proveedorSelected.tercerosID,
      anticipoTipo: tipoAnticipo,
      anticipoFecha: fechaAnticipo,
      valorAnticipo: valorAnticipo,
      anticipoDetalle: detalleAnticipo,
    };
  };

  return (
    <PageBasic
      title="Registro De Anticipos"
      subtitle="Formulario de generación y consulta de anticipos"
    >
      {alert && (
        <ErrorAlert
          message={alert.message}
          type={alert.type}
          autoClose={3000}
          onClose={() => SetAlert(null)}
        />
      )}
      <div className={s.grid}>
        {/* FORMULARIO */}
        <div className={s.formulario}>
          <fieldset className={s.fieldset} disabled={formState == "lectura"}>
            <h3 className={s.sectionTitle}>Información General</h3>
            <Field label="Proveedor">
              <AutoComplete
                placeHolder="Buscar proveedor por nombre..."
                onSearch={getproveedores}
                onSelect={(p) => setProveedorSelected(p)}
                getKey={(p) => p.tercerosID}
                getLabel={(p) =>
                  `${p.tercerosIdentificacion} — ${p.tercerosNombres}`
                }
              ></AutoComplete>
            </Field>
            <Field label="Fecha">
              <DateInput
                value={fechaAnticipo}
                onValueChange={setfechaAnticipo}
                required
              />
            </Field>

            <Field label="Tipo Anticipo">
              <select
                className={f.select}
                onChange={() => setTipoAnticipo}
                value={tipoAnticipo}
              >
                <option value={0}>Proveedor</option>
                <option value={1}>Transportador</option>
              </select>
            </Field>

            <Field label="Detalle Anticipo">
              <input
                type="text"
                placeholder="Ingrese observacion del anticipo"
                value={detalleAnticipo}
                onChange={(e) =>
                  setDetalleAnticipo(e.target.value.toUpperCase())
                }
              ></input>
            </Field>

            <Field label="Valor Anticipo">
              <CurrencyInput
                value={valorAnticipo}
                onChange={(value) => setValorAnticipo(value)}
              ></CurrencyInput>
            </Field>
          </fieldset>

          <div className={s.buttonGroup} style={{ margin: "10px" }}>
            <button
              className={`${s.btn} ${s.btnPrimary}`}
              disabled={formState === "edicion"}
              onClick={HandleCreate}
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
              className={`${s.btn} ${s.btnSuccess}`}
              disabled={formState === "lectura"}
              onClick={HandleSave}
            >
              <BtnSave />
            </button>
            <button
              className={`${s.btn} ${s.btnCancel}`}
              disabled={formState === "lectura"}
            >
              <BtnCancel />
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
            <h3>Filtrar</h3>
          </div>
          <div className={s.tableWrapper}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Observacion</th>
                  <th>Valor</th>
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
    </PageBasic>
  );
}
