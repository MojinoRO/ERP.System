import s from "../Pages/shared.module.css";
import {
  BtonCrear,
  BtnEdit,
  BtnCancel,
  BtnSave,
  BtnEliminar,
} from "../Components/component";
import React, { useEffect, useState } from "react";
import { ListarCiudadesBD, BuscadorCiudades } from "../Api/ConfPaisDepCiu";
import { type ConfCiudadesRespose } from "../Types/ConfPaisDepCiu";

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
  const [formState, setFormState] = useState<"lectura" | "edicion">("edicion");

  //data
  const [textoBuscador, setTextBuscador] = useState("");
  const [listadoCiudades, setListadoCiudades] = useState<ConfCiudadesRespose[]>(
    [],
  );
  const [ciudadesSelected, setCiudadSelected] = useState(emptyCiudades);

  //Events
  const ChangedCiudadesBD = async () => {
    try {
      const data = await ListarCiudadesBD();
      setListadoCiudades(Array.isArray(data) ? data : []);
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
      [name]: name === "departamentoID" ? Number(value) : value.toUpperCase(),
    }));
  };

  return (
    <div className={s.container}>
      <h2 className={s.pageTitle}>Configuración de Ciudades</h2>

      <div className={s.grid}>
        {/* FORMULARIO */}
        <div className={s.formulario}>
          <fieldset className={s.fieldset}>
            <h3 className={s.sectionTitle}>Información General</h3>
            {formState === "lectura" ? <input></input> : <select></select>}
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
                value={ciudadesSelected.codigoDian}
                onChange={handleChanged}
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
