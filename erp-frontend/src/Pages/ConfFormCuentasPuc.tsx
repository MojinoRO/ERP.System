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
import {
  ListarCuentasPuc,
  BuscadorCuentasPuc,
  ValidarCodigo,
  LlamarIDCuentaMayor,
  UpdateMovimientoTerceroCuenta,
  createCuentaPuc,
  updateCuentasPuc,
  deleteCuentasPuc,
} from "../Api/ConfCuentasPuc";
import { type ConfCuentasPucResponse } from "../Types/ConfType";
import { useDebounce } from "../Hook/UseDebounce";
import { useValidateCodigo } from "../Hook/UseValidateCodigo";
import { ConfirmDialog } from "../Components/UI/ConfirmDialog";
import { validateCuentaPucForDelete } from "../Helper/PucHelper";

export default function ConfCuentasPuc() {
  const {
    codigoExiste,
    validando: validandoCodigo,
    validar: validarCodigo,
    setCodigoOriginal,
    reset: resetValidation,
  } = useValidateCodigo(ValidarCodigo);

  const {
    codigoExiste: cuentaMayorExiste,
    validando: validandoCuentaMayor,
    validar: validarCuentaMayor,
    setCodigoOriginal: setCuentaMayorOriginal,
    reset: resetValidateMayor,
  } = useValidateCodigo(ValidarCodigo);

  const emptyCuentaPuc: ConfCuentasPucResponse = {
    cuentasPucID: 0,
    cuentasPucCodigo: "",
    cuentaPucNombre: "",
    cuentaPucNaturaleza: "",
    cuentaPucMovimiento: 0,
    cuentaPucTercero: 0,
    cuentaPucTipo: 0,
  };

  const [errors, setErrors] = useState<{
    cuentasPucID?: number;
    cuentasPucCodigo?: string;
    cuentaPucNombre?: string;
    cuentaPucNaturaleza?: string;
    cuentaPucMovimiento?: number;
    cuentaPucTercero?: number;
    cuentaPucTipo?: number;
  }>({});

  const [formState, setFormState] = useState<"edicion" | "lectura">("lectura");
  const [alert, setAlert] = useState<{
    message: string;
    type: "error" | "success" | "warning";
  } | null>(null);
  const [listaCuenta, setListaCuenta] = useState<ConfCuentasPucResponse[]>([]);
  const [cuentaSelected, setCuentaSelected] = useState(emptyCuentaPuc);
  const [filtro, setFiltro] = useState<string>("");
  const filtroDebounced = useDebounce<string>(filtro, 400);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Guardamos cuál fue el código de la cuenta mayor que se está validando,
  // para poder mostrarlo en el mensaje de error cuando el hook responda
  const [cuentaMayorActual, setCuentaMayorActual] = useState<string>("");

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
        setCuentaSelected(emptyCuentaPuc);
      } else {
        const data = await BuscadorCuentasPuc(filtroDebounced);
        setListaCuenta(data);
      }
    };
    ejecutarBusqueda();
  }, [filtroDebounced]);

  useEffect(() => {
    if (cuentaMayorExiste == null) return;
    if (cuentaMayorExiste === false) {
      setCuentaSelected((prev) => ({
        ...prev,
        cuentasPucCodigo: "",
      }));
      setAlert({
        message: `Cuenta Mayor ${cuentaMayorActual} no existe`,
        type: "error",
      });
    }
    // si cuentaMayorExiste === true, no hacemos nada aquí;
    // la naturaleza ya se calculó en definirNaturaleza
  }, [cuentaMayorExiste, cuentaMayorActual]);

  //definirNaturaleza: valida longitud, dispara validación de padre (si aplica),
  // y calcula la naturaleza contable
  const definirNaturaleza = () => {
    const value = cuentaSelected.cuentasPucCodigo.trim();
    if (value.length % 2 !== 0) {
      setCuentaSelected((prev) => ({
        ...prev,
        cuentasPucCodigo: "",
      }));
      return setAlert({
        message: "El código no cumple con la longitud requerida",
        type: "error",
      });
    }
    // Caso raíz: códigos de 2 dígitos no tienen padre, se salta la validación
    if (value.length > 2) {
      const CuentaMayor = value.slice(0, -2);
      setCuentaMayorActual(CuentaMayor);
      validarCuentaMayor(CuentaMayor);
    } else {
      resetValidateMayor();
    }

    let naturaleza = "";
    let tipo = 0;
    if (value.startsWith("1")) {
      naturaleza = "D";
      tipo = 1;
    } else if (value.startsWith("2")) {
      naturaleza = "C";
      tipo = 2;
    } else if (value.startsWith("3")) {
      naturaleza = "C";
      tipo = 3;
    } else if (value.startsWith("4")) {
      naturaleza = "C";
      tipo = 4;
    } else if (value.startsWith("5")) {
      naturaleza = "D";
      tipo = 5;
    } else if (value.startsWith("6")) {
      naturaleza = "D";
      tipo = 6;
    } else {
      return setAlert({
        message: "Código no corresponde a ninguna clase válida (1-6)",
        type: "error",
      });
    }
    setCuentaSelected((prev) => ({
      ...prev,
      cuentaPucNaturaleza: naturaleza,
      cuentaPucTipo: tipo,
    }));
  };

  //handled
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

  const handleCreate = () => {
    setCuentaSelected(emptyCuentaPuc);
    setCodigoOriginal("");
    resetValidation();
    setFormState("edicion");
  };

  const handleEdit = () => {
    if (cuentaSelected.cuentasPucID == 0) {
      return setAlert({
        message: "Debe Seleccionar Cuenta Modificar",
        type: "success",
      });
    }
    setCodigoOriginal(cuentaSelected.cuentasPucCodigo);
    resetValidation();
    setFormState("edicion");
  };

  const handleCancel = () => {
    setCuentaSelected(emptyCuentaPuc);
    setCodigoOriginal("");
    resetValidation();
    setFormState("lectura");
  };

  const handlesave = async () => {
    if (!ValidateUploadedDate(cuentaSelected))
      return setAlert({ message: "Campos Obligatorios Vacios", type: "error" });
    try {
      const IsNew = cuentaSelected.cuentasPucID == 0;
      if (IsNew) {
        const create = await createCuentaPuc(cuentaSelected);
        if (!create)
          return setAlert({
            message: "Error al crear cuenta puc",
            type: "error",
          });
        UpdateCuentaMayor();
      } else {
        const update = await updateCuentasPuc(cuentaSelected);
        if (!update) {
          return setAlert({
            message: "Error al actualizar cuenta puc",
            type: "error",
          });
        }
      }

      const action = IsNew ? "Creada" : "Actualizada";

      setAlert({
        message: `Cuenta puc ${action} Correctamente`,
        type: "success",
      });
      changedCuentasPuc();
      setFormState("lectura");
    } catch (error: any) {
      setAlert({
        message: "Error Al Guardar Cuenta Puc",
        type: "error",
      });
      console.log(error.response?.data);
    }
  };

  const handleDelete = async () => {
    if (cuentaSelected.cuentasPucID == 0) {
      return setAlert({
        message: "Debe seleccionar cuenta puc a eliminar",
        type: "error",
      });
    }
    const validateAuxiliar = await validateCuentaPucForDelete(
      cuentaSelected.cuentasPucCodigo,
    );

    if (!validateAuxiliar.confirm) {
      setAlert({
        message: validateAuxiliar.message,
        type: "error",
      });
      return;
    }
    setConfirmDelete(true);
  };

  //validate

  const ValidateUploadedDate = (e: ConfCuentasPucResponse) => {
    const newError: typeof errors = {};
    if (!e.cuentasPucCodigo.trim()) newError.cuentasPucCodigo = "Codigo Vacio";
    if (!e.cuentaPucNombre.trim()) newError.cuentasPucCodigo = "Nombre Vacio";
    if (!e.cuentaPucNaturaleza.trim())
      newError.cuentaPucNaturaleza = "Naturaleza Vacia";
    setErrors(newError);
    return Object.keys(newError).length == 0;
  };

  const UpdateCuentaMayor = async () => {
    const cuentaPucId = await LlamarIDCuentaMayor(cuentaMayorActual);
    if (cuentaPucId == 0)
      return setAlert({
        message: "Cuenta Puc Mayor No Existe en la base de datos",
        type: "error",
      });
    const update = await UpdateMovimientoTerceroCuenta(cuentaPucId);
    if (!update)
      return setAlert({
        message: "Error al actualizar Cuenta Puc Id",
        type: "error",
      });
  };

  const deleteCuentaConfirm = () => {
    setAlert({
      message: "voy a eliminar",
      type: "success",
    });
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
                onBlur={(e) => {
                  validarCodigo(e.target.value);
                  definirNaturaleza();
                }}
                name="cuentasPucCodigo"
              ></input>
              {validandoCodigo && (
                <span style={{ fontSize: "12px" }}> Validando...</span>
              )}
              {codigoExiste === true && (
                <span style={{ fontSize: "12px", color: "red" }}>
                  {" "}
                  ⚠ Ya existe
                </span>
              )}
              {codigoExiste === false && (
                <span style={{ fontSize: "12px", color: "green" }}>
                  {" "}
                  ✓ Disponible
                </span>
              )}
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
              onClick={handleCancel}
            >
              <BtnCancel />
            </button>
            <button
              className={`${s.btn} ${s.btnSuccess}`}
              disabled={
                formState === "lectura" ||
                codigoExiste == true ||
                cuentaMayorExiste == false
              }
              onClick={handlesave}
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
      <ConfirmDialog
        open={confirmDelete}
        title="Eliminar Cuenta Puc"
        message={`¿Estas seguro de eliminar ${cuentaSelected.cuentasPucCodigo}? Esta acción no se puede deshacer`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onCancel={() => setConfirmDelete(false)}
        onConfirm={deleteCuentaConfirm}
      />
    </div>
  );
}
