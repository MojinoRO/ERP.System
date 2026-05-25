import React, { useEffect, useState } from "react";
import {
  BtonCrear,
  BtnEdit,
  BtnCancel,
  BtnEliminar,
  BtnSave,
} from "../Components/component";
import s from "./shared.module.css";
import { type responseMarcas } from "../Types/ConfMarcas";
import {
  BuscadorMarcas,
  ListarMarcas,
  ValideCodigoBD,
  CreateMarcas,
  UpdateMarcas,
  DeleteMarcas,
} from "../Api/ConfMarcas";

export default function ConfMarcas() {
  const emptyMarca: responseMarcas = {
    marcaID: 0,
    codigoMarca: "",
    marcaNombre: "",
    estado: 0,
  };

  const [formState, setFormState] = useState<"lectura" | "edicion">("lectura");
  const [listadoMarcas, setListadomarcas] = useState<responseMarcas[]>([]);
  const [marcaselected, setMarcaSelected] = useState(emptyMarca);

  //buscador
  const [nombremarca, setNombreMarcas] = useState("");
  //guardar copia del litado

  const getMarcas = async () => {
    try {
      const listado = await ListarMarcas();
      setListadomarcas(listado);
    } catch (error: any) {
      alert("Error al cargar Marcas");
      console.log(error.response.data);
    }
  };

  const handleBuscar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const dato = e.target.value;
    setNombreMarcas(dato);
    if (!dato.trim()) return await getMarcas();
    try {
      const response = await BuscadorMarcas(dato);
      setListadomarcas(response);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMarcas();
  }, []);

  const HandledCreate = () => {
    setMarcaSelected(emptyMarca);
    setFormState("edicion");
  };

  const handleCancel = () => {
    setMarcaSelected(emptyMarca);
    setFormState("lectura");
  };

  const handleEdit = () => {
    if (marcaselected.marcaID === 0) {
      alert("Seleccione Marca");
      return;
    }
    setFormState("edicion");
  };

  const validate = (e: responseMarcas) => {
    if (!e.codigoMarca.trim()) {
      alert("Codigo Vacio");
      return false;
    }
    if (!e.marcaNombre.trim()) {
      alert("Nombre Vacio");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate(marcaselected)) return;
    try {
      const isNew = marcaselected.marcaID === 0;
      if (isNew) {
        const codigoOk = await ValideCodigoBD(marcaselected.codigoMarca);
        if (codigoOk) {
          alert("Codigo ya existe");
          return;
        }
      }

      const Ok = isNew
        ? await CreateMarcas(marcaselected)
        : await UpdateMarcas(marcaselected);

      const action = isNew ? "creada" : "actualizada";

      alert(
        Ok
          ? `Marca ${action} correctamente`
          : `Error al ${isNew ? "crear" : "actualizar"} la Marca`,
      );
      getMarcas();
      setFormState("lectura");
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const HandledEliminar = async () => {
    if (marcaselected.marcaID == 0) {
      alert("Seleccione marca a eliminar");
      return;
    }
    try {
      const query = window.confirm("¿Eliminar Marca?");
      if (query) {
        const eliminar = await DeleteMarcas(marcaselected.marcaID);
        if (!eliminar) {
          alert("Error al eliminar Marca");
        } else {
          alert("Marca Eliminada correctamente");
        }
      }
      getMarcas();
      setMarcaSelected(emptyMarca);
      setFormState("lectura");
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const handledChanged = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setMarcaSelected((prev) => ({
      ...prev,
      [name]: name === "estado" ? Number(value) : value.toUpperCase(),
    }));
  };

  return (
    <div className={s.container}>
      <h2 className={s.pageTitle}>Creación de marcas</h2>
      <div className={s.grid}>
        <div className={s.formulario}>
          <fieldset disabled={formState !== "edicion"} className={s.fieldset}>
            <h1 className={s.sectionTitle}>Información general</h1>
            <div className={`${s.formRow} ${s.cols2}`}>
              <div className={s.formGroup}>
                <label className={s.label}>Código</label>

                <input
                  name="codigoMarca"
                  className={s.input}
                  value={marcaselected.codigoMarca}
                  onChange={handledChanged}
                ></input>

                <label className={s.label}>Nombre Marca</label>
                <input
                  name="marcaNombre"
                  className={s.input}
                  value={marcaselected.marcaNombre}
                  onChange={handledChanged}
                ></input>
                <label className={s.label}>Estado</label>
                <select
                  className={s.select}
                  value={marcaselected.estado}
                  onChange={handledChanged}
                >
                  <option value="0">Activo</option>
                  <option value="1">Inactivo</option>
                </select>
              </div>
            </div>
          </fieldset>
          <div className={s.buttonGroup}>
            <button
              className={`${s.btn} ${s.btnPrimary}`}
              disabled={formState !== "lectura"}
              onClick={HandledCreate}
            >
              <BtonCrear />
            </button>

            <button
              className={`${s.btn} ${s.btnEdit}`}
              disabled={formState !== "lectura"}
              onClick={handleEdit}
            >
              <BtnEdit />
            </button>

            <button
              className={`${s.btn} ${s.btnCancel}`}
              disabled={formState !== "edicion"}
              onClick={handleCancel}
            >
              <BtnCancel />
            </button>

            <button
              className={`${s.btn} ${s.btnSuccess}`}
              disabled={formState !== "edicion"}
              onClick={handleSave}
            >
              <BtnSave />
            </button>

            <button
              className={`${s.btn} ${s.btnDanger}`}
              disabled={formState !== "lectura"}
              onClick={HandledEliminar}
            >
              <BtnEliminar />
            </button>
          </div>
        </div>

        <div className={s.list}>
          <div className={s.listHeader}>
            <h2>Listado Marcas</h2>
            <input
              className={s.search}
              placeholder="Buscar ... "
              value={nombremarca}
              onChange={handleBuscar}
            ></input>
          </div>
          <table
            className={`${s.table} ${formState === "edicion" ? s.disabledTable : ""}`}
          >
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nombre Marca</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {listadoMarcas.map((d, i) => (
                <tr
                  key={i}
                  onDoubleClick={() => setMarcaSelected(d)}
                  className={
                    marcaselected?.marcaID == d.marcaID ? s.selectedRow : ""
                  }
                >
                  <td>{d.codigoMarca}</td>
                  <td>{d.marcaNombre}</td>
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
