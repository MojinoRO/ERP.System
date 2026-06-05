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
} from "../Api/ConfPaisDepCiu";
import { type ConfDepartamentosResponse } from "../Types/ConfPaisDepCiu";
import React, { useEffect, useState } from "react";
import { Edit } from "lucide-react";

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
  const [departamentoSelected, setDepartamentoSelected] =
    useState(emptyDepartamentos);
  const [textBuscador, setTextBuscador] = useState("");

  const handleBuscar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const dato = e.target.value;
    setTextBuscador(dato);
    if (!dato.trim()) return ChangeDepartamentos();
    try {
      const lista = await BuscarDepartamentoPorNombre(textBuscador);
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

  const handleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setDepartamentoSelected({
      ...departamentoSelected,
      [name]: value.toUpperCase(),
    });
  };

  useEffect(() => {
    ChangeDepartamentos();
  }, []);

  return (
    <div className={s.container}>
      <h2 className={s.pageTitle}>Configuración de Departamentos</h2>

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
                ></input>
              ) : (
                <select></select>
              )}
            </div>
            <div className={s.formRow}>
              <label className={s.label}>Departamento Codigo</label>
              <input
                className={s.input}
                value={departamentoSelected.departamentoCodigo}
                onChange={handleChanged}
              ></input>
            </div>

            <div className={s.formRow}>
              <label className={s.label}>Departamento Nombre</label>
              <input
                className={s.input}
                value={departamentoSelected.departamentoNombre}
                onChange={handleChanged}
              ></input>
            </div>

            <div className={s.formRow}>
              <label className={s.label}>Codigo Iso</label>
              <input
                value={departamentoSelected.codigoISO}
                onChange={handleChanged}
                className={s.input}
              ></input>
            </div>
          </fieldset>

          <div className={s.buttonGroup} style={{ margin: "10px" }}>
            <button className={`${s.btn} ${s.btnPrimary}`}>
              <BtonCrear />
            </button>
            <button className={`${s.btn} ${s.btnEdit}`}>
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
            <h3>Listado de Registros</h3>

            <input
              className={s.search}
              placeholder="Buscar..."
              value={textBuscador}
              onChange={handleBuscar}
            />
          </div>

          <div className={s.tableWrapper}>
            <table className={s.table}>
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
    </div>
  );
}
