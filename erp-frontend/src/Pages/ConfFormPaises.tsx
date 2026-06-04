import s from "../Pages/shared.module.css";
import {
  BtonCrear,
  BtnEdit,
  BtnCancel,
  BtnSave,
  BtnEliminar,
} from "../Components/component";
import { Input } from "../Components/UI/Input";
import React, { useEffect, useState } from "react";
import { ListarPaises, BuscarPaisBD } from "../Api/ConfPaisDepCiu";
import { type ConfPaisResponse } from "../Types/ConfPaisDepCiu";
import { ErrorAlert } from "../Components/UI/ErrorAlert";
import { ConfirmDialog } from "../Components/UI/ConfirmDialog";

export default function ConfPaises() {
  const emptyPais: ConfPaisResponse = {
    paisID: 0,
    codigoPais: "",
    nombrePais: "",
    codigoAlfa: "",
  };

  const [formState, setFormState] = useState<"edicion" | "lectura">("lectura");
  const [listadoPaises, setListadoPaises] = useState<ConfPaisResponse[]>([]);
  const [paisSelected, setPaisSelected] = useState(emptyPais);
  const [textBuscador, settextBuscador] = useState("");
  const [alert, setAlert] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, SetError] = useState<{
    codigoPais?: string;
    nombrePais?: string;
    codigoAlfa?: string;
  }>({});

  //functions
  const handleEdit = () => {
    if (paisSelected.paisID == 0) {
      setAlert({
        message: "Seleccione Pais a modificar",
        type: "error",
      });
    }
    setFormState("edicion");
  };

  const ChangedPaises = async () => {
    try {
      const paises = await ListarPaises();
      setListadoPaises(Array.isArray(paises) ? paises : []);
    } catch (error: any) {
      console.error(
        "Error al cargar países:",
        error?.response?.data || error.message || error,
      );
    }
  };

  const HanbledBuscador = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    settextBuscador(text);
    if (!text.trim()) return await ChangedPaises();
    try {
      const data = await BuscarPaisBD(text);
      setListadoPaises(data);
    } catch (error: any) {
      console.log(
        "Error al cargar países:",
        error?.response?.data || error.message || error,
      );
    }
  };

  const HandleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setPaisSelected({
      ...paisSelected,
      [name]: value.toUpperCase(),
    });
  };

  useEffect(() => {
    ChangedPaises();
  }, []);

  return (
    <div className={s.container}>
      <h2 className={s.pageTitle}>Configuración de Paises</h2>
      {alert && (
        <ErrorAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        ></ErrorAlert>
      )}
      <div className={s.grid}>
        {/* FORMULARIO */}
        <div className={s.formulario}>
          <fieldset className={s.fieldset} disabled={formState !== "edicion"}>
            <h3 className={s.pageTitle}>Información General</h3>

            <div className={s.formRow}>
              <label className={s.label}>Pais Codigo</label>
              <Input
                value={paisSelected.codigoPais}
                onChange={HandleChanged}
              ></Input>
            </div>

            <div className={s.formRow}>
              <label className={s.label}>Pais Nombre</label>
              <Input
                value={paisSelected.nombrePais}
                onChange={HandleChanged}
              ></Input>
            </div>

            <div className={s.formRow}>
              <label className={s.label}>Codigo Alfa</label>
              <Input
                value={paisSelected.codigoAlfa}
                onChange={HandleChanged}
              ></Input>
            </div>
          </fieldset>

          <div className={s.buttonGroup} style={{ margin: "10px" }}>
            <button className={`${s.btn} ${s.btnPrimary}`}>
              <BtonCrear />
            </button>
            <button className={`${s.btn} ${s.btnEdit}`} onClick={handleEdit}>
              <BtnEdit />
            </button>
            <button className={`${s.btn} ${s.BtnCancel}`}>
              <BtnCancel />
            </button>
            <button className={`${s.btn} ${s.btnSuccess}`}>
              <BtnSave />
            </button>
            <button className={`${s.btn} ${s.btnDanger}`}>
              <BtnEliminar />
            </button>
          </div>
        </div>

        {/* LISTADO */}
        <div className={s.list}>
          <div className={s.listHeader}>
            <h3>Listado de Paises</h3>
            <input
              className={s.search}
              placeholder="Buscar..."
              value={textBuscador}
              onChange={HanbledBuscador}
            />
          </div>

          <div className={s.tableWrapper}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>CodigoAlfa</th>
                </tr>
              </thead>
              <tbody>
                {listadoPaises.map((d, i) => (
                  <tr
                    key={i}
                    onDoubleClick={() => setPaisSelected(d)}
                    className={
                      paisSelected.paisID === d.paisID ? s.selectedRow : ""
                    }
                  >
                    <td>{d.codigoPais}</td>
                    <td>{d.nombrePais}</td>
                    <td>{d.codigoAlfa}</td>
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
