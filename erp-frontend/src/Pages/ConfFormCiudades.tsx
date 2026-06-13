import s from "../Pages/shared.module.css";
import {
  BtonCrear,
  BtnEdit,
  BtnCancel,
  BtnSave,
  BtnEliminar,
} from "../Components/component";
import React, { useEffect, useState } from "react";
import {
  ListarCiudadesBD,
  BuscadorCiudades,
  ListarDepartamentos,
  CreateCiudad,
  UpdateCiudad,
  DeleteCiudad,
  ValidarCodigoCiudadBD,
} from "../Api/ConfPaisDepCiu";
import {
  type ConfCiudadesRespose,
  type ConfDepartamentosResponse,
} from "../Types/ConfPaisDepCiu";
import { ErrorAlert } from "../Components/UI/ErrorAlert";

export default function ConfCiudades() {
  const emptyCiudades: ConfCiudadesRespose = {
    ciudadID: 0,
    departamentoID: 0,
    ciudadCodigo: "",
    ciudadNombre: "",
    codigoDian: "",
    departamentoCodigo: "",
    departamentoNombre: "",
  };

  //estados IU
  const [formState, setFormState] = useState<"lectura" | "edicion">("lectura");
  const [alert, setAlert] = useState<{
    message: string;
    type: "error" | "success" | "warning";
  } | null>(null);

  const [errors, setErrors] = useState<{
    ciudadID?: string;
    departamentoID?: string;
    ciudadCodigo?: string;
    ciudadNombre?: string;
  }>({});

  //data
  const [textoBuscador, setTextBuscador] = useState("");
  const [listadoCiudades, setListadoCiudades] = useState<ConfCiudadesRespose[]>(
    [],
  );
  const [departamentos, setDepartamento] = useState<
    ConfDepartamentosResponse[]
  >([]);
  const [ciudadesSelected, setCiudadSelected] = useState(emptyCiudades);

  //handle

  const handleCreate = async () => {
    setCiudadSelected(emptyCiudades);
    setFormState("edicion");
  };

  const handleEdit = async () => {
    if (ciudadesSelected.ciudadID === 0) {
      return setAlert({
        message: "Debe Seleccionar Ciudad A Modificar",
        type: "error",
      });
    }
    setFormState("edicion");
  };

  const handleCancel = async () => {
    setCiudadSelected(emptyCiudades);
    setFormState("lectura");
    setAlert({
      message: "Proceso Cancelado Por el Usuario",
      type: "warning",
    });
  };

  const handleSave = async () => {
    if (!ValidateForm(ciudadesSelected)) {
      return setAlert({
        message: "Error Campo en Blancos",
        type: "error",
      });
    }
    try {
      const IsNew = ciudadesSelected.ciudadID == 0;
      if (IsNew) {
        const CodigoOK = await ValidarCodigoCiudadBD(
          ciudadesSelected.ciudadCodigo,
        );
        if (CodigoOK) {
          return setAlert({
            message: "Codigo Ya Existe Para Otra Ciudad",
            type: "error",
          });
        }
      }
      const Ok = IsNew
        ? await CreateCiudad(ciudadesSelected)
        : await UpdateCiudad(ciudadesSelected);

      const action = IsNew ? "Creada" : "Actualizada";

      setAlert({
        message: `Marca ${action} correctamente`,
        type: Ok ? "success" : "error",
      });

      setCiudadSelected(emptyCiudades);
      setFormState("lectura");
      ChangedCiudadesBD();
    } catch (error: any) {
      setAlert({
        message: "Error Al Guardar Cambios",
        type: "error",
      });
      console.log(error.response?.data);
    }
  };

  //changed
  const ValidateForm = (e: ConfCiudadesRespose) => {
    const NewError: typeof errors = {};
    if (e.departamentoID === 0) {
      NewError.departamentoID = "Departamento en blanco";
    }
    if (!e.ciudadCodigo.trim()) {
      NewError.ciudadCodigo = "Ciudad en blanco";
    }
    if (!e.ciudadNombre.trim()) {
      NewError.ciudadNombre = "Nombre Invalido";
    }

    setErrors(NewError);

    return Object.keys(NewError).length === 0;
  };

  const ChangedCiudadesBD = async () => {
    try {
      const data = await ListarCiudadesBD();
      setListadoCiudades(Array.isArray(data) ? data : []);
      const departamento = await ListarDepartamentos();
      setDepartamento(Array.isArray(departamento) ? departamento : []);
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const SearchCiudad = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const texto = e.target.value;
    setTextBuscador(texto);
    if (!texto.trim()) return await ChangedCiudadesBD();
    try {
      const ciudad = await BuscadorCiudades(texto);
      setListadoCiudades(Array.isArray(ciudad) ? ciudad : []);
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    ChangedCiudadesBD();
  }, []);

  const handleChanged = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setCiudadSelected((prev) => ({
      ...prev,
      [name]:
        name === "departamentoID" || name === "ciudadID"
          ? Number(value)
          : value.toUpperCase(),
    }));
  };

  return (
    <div className={s.container}>
      <h2 className={s.pageTitle}>Configuración de Ciudades</h2>
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
          <fieldset className={s.fieldset} disabled={formState === "lectura"}>
            <h3 className={s.sectionTitle}>Información General</h3>
            {formState === "lectura" ? (
              <input
                name="departamentoCodigo"
                className={s.input}
                value={`${ciudadesSelected.departamentoCodigo} ${ciudadesSelected.departamentoNombre}`}
                onChange={handleChanged}
              ></input>
            ) : (
              <select
                name="departamentoID"
                className={s.select}
                value={ciudadesSelected.departamentoID}
                onChange={handleChanged}
              >
                <option value={0}>Seleccione Departamento</option>
                {departamentos.map((e) => (
                  <option key={e.departamentoID} value={e.departamentoID}>
                    {e.departamentoCodigo}
                    {"-"} {e.departamentoNombre}
                  </option>
                ))}
              </select>
            )}
            <div className={s.formRow}>
              <label className={s.label}>Codigo Ciudad</label>
              <input
                name="ciudadCodigo"
                className={s.input}
                value={ciudadesSelected.ciudadCodigo}
                onChange={handleChanged}
              ></input>
            </div>

            <div className={s.formRow}>
              <label className={s.label}>Nombre Ciudad</label>
              <input
                name="ciudadNombre"
                className={s.input}
                value={ciudadesSelected.ciudadNombre}
                onChange={handleChanged}
              ></input>
            </div>

            <div className={s.formRow}>
              <label className={s.label}>Codigo Dian</label>
              <input
                name="codigoDian"
                className={s.input}
                value={ciudadesSelected.codigoDian ?? ""}
                onChange={handleChanged}
              ></input>
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
              value={textoBuscador}
              onChange={SearchCiudad}
            />
          </div>

          <div className={s.tableWrapper}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Departamento</th>
                </tr>
              </thead>

              <tbody>
                {listadoCiudades.map((d, i) => (
                  <tr
                    key={i}
                    onDoubleClick={() => setCiudadSelected(d)}
                    className={
                      ciudadesSelected.ciudadID === d.ciudadID
                        ? s.selectedRow
                        : ""
                    }
                  >
                    <td>{d.ciudadCodigo}</td>
                    <td>{d.ciudadNombre}</td>
                    <td>{d.departamentoNombre}</td>
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
