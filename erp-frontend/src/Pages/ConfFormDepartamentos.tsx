import s from "../Pages/shared.module.css";
import {
  BtonCrear,
  BtnEdit,
  BtnCancel,
  BtnSave,
  BtnEliminar,
} from "../Components/component";
import {
  BuscarDepartamentoPorNombre,
  ListarDepartamentos,
  ListarPaises,
  ValidarCodigoDepartamentoBD,
  CreateDepartamentos,
  UpdateDepartamentos,
  DeleteDepartamentos,
} from "../Api/ConfPaisDepCiu";
import {
  type ConfDepartamentosResponse,
  type ConfPaisResponse,
} from "../Types/ConfPaisDepCiu";
import React, { useEffect, useState } from "react";
import { ErrorAlert } from "../Components/UI/ErrorAlert";
import { ConfirmDialog } from "../Components/UI/ConfirmDialog";

export default function ConfDepartamentos() {
  const emptyDepartamentos: ConfDepartamentosResponse = {
    departamentoID: 0,
    paisID: 0,
    departamentoCodigo: "",
    departamentoNombre: "",
    codigoISO: "",
    paisNombre: "",
    paisCodigo: "",
  };
  const [formState, setFormState] = useState<"lectura" | "edicion">("lectura");
  const [listaDepartamentos, setListaDepartamentos] = useState<
    ConfDepartamentosResponse[]
  >([]);
  const [listaPaises, setListaPaises] = useState<ConfPaisResponse[]>([]);

  const [departamentoSelected, setDepartamentoSelected] =
    useState(emptyDepartamentos);
  const [textBuscador, setTextBuscador] = useState("");
  const [alert, setAlert] = useState<{
    message: string;
    type: "error" | "success" | "warning";
  } | null>(null);
  const [errors, SetErrors] = useState<{
    paisID?: string;
    departamentoCodigo?: string;
    departamentoNombre?: string;
    codigoISO?: string;
  }>({});

  const [confirmDelete, setConfirmDelete] = useState(false);

  //validate
  const ValidarCampos = (e: ConfDepartamentosResponse) => {
    const NewError: typeof errors = {};

    if (e.paisID === 0) {
      NewError.paisID = "Debe seleccionar un país";
    }

    if (!e.departamentoCodigo.trim()) {
      NewError.departamentoCodigo = "Código vacío";
    }

    if (!e.departamentoNombre.trim()) {
      NewError.departamentoNombre = "Nombre vacío";
    }

    SetErrors(NewError);

    return Object.keys(NewError).length === 0;
  };
  //funtions
  const handleCreate = () => {
    setDepartamentoSelected(emptyDepartamentos);
    setFormState("edicion");
  };

  const handleEdit = () => {
    if (departamentoSelected.departamentoID === 0) {
      return setAlert({
        message: "Debe seleccionar pais a modificar",
        type: "error",
      });
    }
    setFormState("edicion");
  };

  const handleCancel = () => {
    setDepartamentoSelected(emptyDepartamentos);
    setFormState("lectura");
    setAlert({
      message: "Proceso Cancelado",
      type: "warning",
    });
  };

  const handleSave = async () => {
    if (!ValidarCampos(departamentoSelected)) {
      return setAlert({
        message: "Verifique los campos obligatorios",
        type: "error",
      });
    }

    try {
      const IsNew = departamentoSelected.departamentoID === 0;

      if (IsNew) {
        const query = await ValidarCodigoDepartamentoBD(
          departamentoSelected.departamentoCodigo,
        );

        if (query) {
          return setAlert({
            message: "Código de departamento ya existe",
            type: "error",
          });
        }
      }
      console.log(departamentoSelected);
      console.log(IsNew ? "crea" : "actualiza");

      const ok = IsNew
        ? await CreateDepartamentos(departamentoSelected)
        : await UpdateDepartamentos(departamentoSelected);

      const action = IsNew ? "Creado" : "Actualizado";
      setAlert({
        message: `Departamento ${action} Correctamente`,
        type: ok ? "success" : "error",
      });
      setFormState("lectura");
      setDepartamentoSelected(emptyDepartamentos);
      await ChangeDepartamentos();
    } catch (error: any) {
      console.log(error?.response?.data);

      setAlert({
        message: "Error al guardar departamento",
        type: "error",
      });
    }
  };

  const handleDelete = () => {
    if (departamentoSelected.departamentoID === 0)
      return setAlert({
        message: "Debe seleccionar Departamento a eliminar",
        type: "error",
      });
    setConfirmDelete(true);
  };
  //Event
  const ChangedPais = async () => {
    try {
      const paises = await ListarPaises();
      setListaPaises(paises);
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const handleBuscar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const dato = e.target.value;
    setTextBuscador(dato);
    if (!dato.trim()) return ChangeDepartamentos();
    try {
      const lista = await BuscarDepartamentoPorNombre(dato);
      setListaDepartamentos(lista);
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const ChangeDepartamentos = async () => {
    try {
      const departamentos = await ListarDepartamentos();
      setListaDepartamentos(departamentos);
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const handleChanged = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { value, name } = e.target;

    setDepartamentoSelected((prev) => ({
      ...prev,
      [name]: name === "paisID" ? Number(value) : value.toUpperCase(),
    }));

    SetErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const ConfirmDelete = async () => {
    try {
      const borrar = await DeleteDepartamentos(
        departamentoSelected.departamentoID,
      );

      if (!borrar) {
        setConfirmDelete(false);

        return setAlert({
          message: `Error al eliminar departamento ${departamentoSelected.departamentoNombre}`,
          type: "error",
        });
      }

      setAlert({
        message: "Departamento eliminado correctamente",
        type: "success",
      });

      setFormState("lectura");
      setDepartamentoSelected(emptyDepartamentos);
      setConfirmDelete(false);

      await ChangeDepartamentos();
    } catch (error: any) {
      setConfirmDelete(false);

      setAlert({
        message: `Error al eliminar departamento ${departamentoSelected.departamentoNombre}`,
        type: "error",
      });

      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    ChangeDepartamentos();
  }, []);

  useEffect(() => {
    ChangedPais();
  }, []);

  return (
    <div className={s.container}>
      <h2 className={s.pageTitle}>Configuración de Departamentos</h2>
      {alert && (
        <ErrorAlert
          message={alert.message}
          type={alert.type}
          autoClose={3000}
          onClose={() => setAlert(null)}
        />
      )}
      <div className={s.grid}>
        {/* FORMULARIO */}
        <div className={s.formulario}>
          <fieldset className={s.fieldset} disabled={formState === "lectura"}>
            <h3 className={s.sectionTitle}>Información General</h3>
            <div>
              {formState === "lectura" ? (
                <input
                  className={s.input}
                  value={`${departamentoSelected.paisCodigo} ${departamentoSelected.paisNombre}`}
                  onChange={handleChanged}
                  name="paisCodigo"
                ></input>
              ) : (
                <select
                  name="paisID"
                  className={s.select}
                  value={departamentoSelected.paisID}
                  onChange={handleChanged}
                >
                  <option value={0}>Seleccione Pais</option>
                  {listaPaises.map((e) => (
                    <option key={e.paisID} value={e.paisID}>
                      {e.codigoPais} -{"  "} {e.nombrePais}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className={s.formRow}>
              <label className={s.label}>Departamento Codigo</label>
              <input
                className={s.input}
                value={departamentoSelected.departamentoCodigo}
                onChange={handleChanged}
                name="departamentoCodigo"
              ></input>
            </div>

            <div className={s.formRow}>
              <label className={s.label}>Departamento Nombre</label>
              <input
                className={s.input}
                value={departamentoSelected.departamentoNombre}
                onChange={handleChanged}
                name="departamentoNombre"
              ></input>
            </div>

            <div className={s.formRow}>
              <label className={s.label}>Codigo Iso</label>
              <input
                value={departamentoSelected.codigoISO}
                onChange={handleChanged}
                className={s.input}
                name="codigoISO"
              ></input>
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
              disabled={formState === "edicion"}
              onClick={handleEdit}
            >
              <BtnEdit />
            </button>
            <button
              className={`${s.btn} ${s.BtnCancel}`}
              disabled={formState === "lectura"}
              onClick={handleCancel}
            >
              <BtnCancel />
            </button>
            <button
              className={`${s.btn} ${s.btnSuccess}`}
              disabled={formState === "lectura"}
              onClick={handleSave}
            >
              <BtnSave />
            </button>
            <button
              className={`${s.btn} ${s.btnDanger}`}
              disabled={formState === "edicion"}
              onClick={handleDelete}
            >
              <BtnEliminar />
            </button>
          </div>
        </div>

        {/* LISTADO */}
        <div className={s.list}>
          <div className={s.listHeader}>
            <h3>Listado de Registros</h3>

            <input
              className={s.search}
              placeholder="Buscar..."
              value={textBuscador}
              onChange={handleBuscar}
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
                  <th>Pais</th>
                </tr>
              </thead>

              <tbody>
                {listaDepartamentos.map((d, i) => (
                  <tr
                    key={i}
                    onDoubleClick={() => setDepartamentoSelected(d)}
                    className={
                      departamentoSelected.departamentoID == d.departamentoID
                        ? s.selectedRow
                        : ""
                    }
                  >
                    <td>{d.departamentoCodigo}</td>
                    <td>{d.departamentoNombre}</td>
                    <td>{d.paisNombre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={confirmDelete}
        title="Eliminar Departamento"
        message={`¿Estás seguro de eliminar el departamento ${departamentoSelected.departamentoNombre}? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={ConfirmDelete}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  );
}
