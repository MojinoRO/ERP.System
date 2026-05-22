import {
  BtonCrear,
  BtnEdit,
  BtnCancel,
  BtnEliminar,
  BtnSave,
} from "../Components/component";
import s from "./shared.module.css";
import { type ResponseAlmacenes } from "../Types/ConfAlmacenes";
import { ListarAlmacenesBD, BuscadorAlmacen } from "../Api/ConfAlmacenes";
import React, { useEffect, useState } from "react";

export default function ConfAlmacenes() {
  const emptyAlmacen: ResponseAlmacenes = {
    almacenID: 0,
    almacenCodigo: "",
    almacenNombre: "",
    estado: 0,
  };

  const [formState, setFormState] = useState<"lectura" | "edicion">("lectura");
  const [almacenSelected, setAlmacenSelected] = useState(emptyAlmacen);
  const [listadoAlmacen, setListadoAlmacen] = useState<ResponseAlmacenes[]>([]);
  const [nombrealmacen, setNombreAlmacen] = useState("");

  const ListarAlmacen = async () => {
    try {
      const listado = await ListarAlmacenesBD();
      setListadoAlmacen(listado);
    } catch (error: any) {
      console.log(error?.response.data);
    }
  };

  const HandelBuscador = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const dato = e.target.value;
    setNombreAlmacen(dato);
    if (!dato.trim()) return await ListarAlmacenesBD();
    try {
      const buscador = await BuscadorAlmacen(dato);
      setListadoAlmacen(buscador);
    } catch (error: any) {
      console.log(error?.response.data);
    }
  };

  const handleCancel = () => {
    setFormState("lectura");
    setAlmacenSelected(emptyAlmacen);
  };

  const handleCreate = () => {
    setAlmacenSelected(emptyAlmacen);
    setFormState("edicion");
  };

  useEffect(() => {
    ListarAlmacen();
  }, []);

  const handleChanged = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setAlmacenSelected((prev) => ({
      ...prev,
      [name]: name === "estado" ? Number(value) : value.toUpperCase(),
    }));
  };

  return (
    <div className={s.container}>
      <h2 className={s.pageTitle}>Creación de Almacenes</h2>
      <div className={s.grid}>
        <div className={s.formulario}>
          <fieldset className={s.fieldset} disabled={formState !== "edicion"}>
            <h1 className={s.sectionTitle}>Información general </h1>
            <div className={`${s.formRow} ${s.cols2}`}>
              <div className={s.formGroup}>
                <label className={s.label}>Código</label>
                <input
                  className={s.input}
                  value={almacenSelected.almacenCodigo}
                  onChange={handleChanged}
                ></input>

                <label className={s.label}>Nombre Almacen</label>
                <input
                  className={s.input}
                  value={almacenSelected.almacenNombre}
                  onChange={handleChanged}
                ></input>
                <label className={s.label}>Estado</label>
                <select
                  className={s.select}
                  value={almacenSelected.estado}
                  onChange={handleChanged}
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
              disabled={formState === "edicion"}
              onClick={handleCreate}
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
              className={`${s.btn} ${s.btnCancel}`}
              disabled={formState === "lectura"}
              onClick={handleCancel}
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

        <div className={s.list}>
          <div className={s.listHeader}>
            <h2>Listado Almacenes</h2>
            <input
              className={s.search}
              placeholder="Buscar ... "
              value={nombrealmacen}
              onChange={HandelBuscador}
              disabled={formState !== "lectura"}
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
              {listadoAlmacen.map((d, i) => (
                <tr
                  key={i}
                  onDoubleClick={() => setAlmacenSelected(d)}
                  className={
                    almacenSelected?.almacenID == d.almacenID
                      ? s.selectedRow
                      : ""
                  }
                >
                  <td>{d.almacenCodigo}</td>
                  <td>{d.almacenNombre}</td>
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
