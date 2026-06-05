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
import {
  ListarPaises,
  BuscarPaisBD,
  ValidaCodigoBD,
  CrearPais,
  UpdatePais,
  DeletePais,
} from "../Api/ConfPaisDepCiu";
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
  const [errors, SetErrors] = useState<{
    codigoPais?: string;
    nombrePais?: string;
    codigoAlfa?: string;
  }>({});

  //functions

  const handleCreate = () => {
    setPaisSelected(emptyPais);
    setFormState("edicion");
    SetErrors({});
  };

  const handleEdit = () => {
    if (paisSelected.paisID == 0) {
      return setAlert({
        message: "Seleccione Pais a modificar",
        type: "error",
      });
    }
    setFormState("edicion");
    console.log(paisSelected.paisID);
  };

  const handleCancel = () => {
    setPaisSelected(emptyPais);
    setFormState("lectura");
    SetErrors({});
  };

  const handleSave = async () => {
    if (!ValidateForm(paisSelected)) return;
    try {
      const IsNew = paisSelected.paisID == 0;
      if (IsNew) {
        const query = await ValidaCodigoBD(paisSelected.codigoPais);
        if (query) {
          setAlert({
            message: "Codigo De Pais Ya Existe",
            type: "error",
          });
          return;
        }
      }
      const Ok = IsNew
        ? await CrearPais(paisSelected)
        : await UpdatePais(paisSelected);

      const action = IsNew ? "Creado" : "Actualizado";
      console.log(action);
      setAlert({
        message: `Pais ${action} Correctamente`,
        type: Ok ? "success" : "error",
      });

      setFormState("lectura");
      ChangedPaises();
      setPaisSelected(emptyPais);
      SetErrors({});
    } catch (error: any) {
      setAlert({
        message: "Error Al Guardar Pais",
        type: "error",
      });
      console.log(error.response?.data);
    }
  };

  const handleDelete = () => {
    if (paisSelected.paisID === 0) {
      return setAlert({
        message: "Debe Seleccionar Pais Para Eliminar",
        type: "error",
      });
    }
    setConfirmDelete(true);
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

  const ConfirmDeletePais = async () => {
    try {
      const Borrar = await DeletePais(paisSelected.paisID);
      if (!Borrar)
        return setAlert({
          message: "No Se Ha Podido Eliminar Pais",
          type: "error",
        });
      setAlert({ message: "Pais Eliminado Correctamente", type: "success" });
      setPaisSelected(emptyPais);
      ChangedPaises();
      setConfirmDelete(false);
    } catch (error: any) {
      setAlert({
        message: "Error Al Eliminar Pais",
        type: "error",
      });
      console.log(error.response?.data);
    }
  };

  const ValidateForm = (e: ConfPaisResponse) => {
    const newErrors: typeof errors = {};
    if (!e.codigoPais.trim()) {
      newErrors.codigoPais = "Codigo Vacio";
      setAlert({
        message: "Codigo Vacio",
        type: "error",
      });
    }
    if (!e.nombrePais.trim()) {
      newErrors.nombrePais = "Nombre Vacio";
      setAlert({
        message: "Nombre  Vacio",
        type: "error",
      });
    }
    SetErrors(newErrors);
    return Object.keys(newErrors).length == 0;
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
              <label className={s.label}>Pais Codigo</label>
              <Input
                value={paisSelected.codigoPais}
                onChange={HandleChanged}
                name="codigoPais"
              ></Input>
            </div>

            <div className={s.formRow}>
              <label className={s.label}>Pais Nombre</label>
              <Input
                value={paisSelected.nombrePais}
                onChange={HandleChanged}
                name="nombrePais"
              ></Input>
            </div>

            <div className={s.formRow}>
              <label className={s.label}>Codigo Alfa</label>
              <Input
                value={paisSelected.codigoAlfa}
                onChange={HandleChanged}
                name="codigoAlfa"
              ></Input>
            </div>
          </fieldset>

          <div className={s.buttonGroup} style={{ margin: "10px" }}>
            <button
              className={`${s.btn} ${s.btnPrimary}`}
              onClick={handleCreate}
              disabled={formState === "edicion"}
            >
              <BtonCrear />
            </button>
            <button
              className={`${s.btn} ${s.btnEdit}`}
              onClick={handleEdit}
              disabled={formState === "edicion"}
            >
              <BtnEdit />
            </button>
            <button
              className={`${s.btn} ${s.BtnCancel}`}
              onClick={handleCancel}
              disabled={formState === "lectura"}
            >
              <BtnCancel />
            </button>
            <button
              className={`${s.btn} ${s.btnSuccess}`}
              onClick={handleSave}
              disabled={formState === "lectura"}
            >
              <BtnSave />
            </button>
            <button
              className={`${s.btn} ${s.btnDanger}`}
              onClick={handleDelete}
              disabled={formState === "edicion"}
            >
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
            <table
              className={`${s.table} ${formState === "edicion" ? s.disabledTable : ""}`}
            >
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
      <ConfirmDialog
        open={confirmDelete}
        title="Eliminar Pais"
        message={`¿Estás seguro de que deseas eliminar el pais "${paisSelected.nombrePais}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={ConfirmDeletePais}
        onCancel={() => setConfirmDelete(false)}
      ></ConfirmDialog>
    </div>
  );
}
