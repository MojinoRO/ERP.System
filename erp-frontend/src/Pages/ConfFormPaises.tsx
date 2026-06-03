import s from "../Pages/shared.module.css";
import {
  BtonCrear,
  BtnEdit,
  BtnCancel,
  BtnSave,
  BtnEliminar,
} from "../Components/component";
import { Input } from "../Components/UI/Input";
import { useEffect, useState } from "react";
import { ListarPaises } from "../Api/ConfPaisDepCiu";
import { type ConfPaisResponse } from "../Types/ConfPaisDepCiu";

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

  //functions
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

  useEffect(() => {
    ChangedPaises();
  }, []);
  return (
    <div className={s.container}>
      <h2 className={s.pageTitle}>Configuración de Paises</h2>

      <div className={s.grid}>
        {/* FORMULARIO */}
        <div className={s.formulario}>
          <fieldset className={s.fieldset} disabled={formState !== "edicion"}>
            <h3 className={s.pageTitle}>Información General</h3>

            <div className={s.formRow}>
              <label className={s.label}>Pais Codigo</label>
              <Input></Input>
            </div>

            <div className={s.formRow}>
              <label className={s.label}>Pais Nombre</label>
              <Input></Input>
            </div>

            <div className={s.formRow}>
              <label className={s.label}>Codigo Alfa</label>
              <Input></Input>
            </div>
          </fieldset>

          <div className={s.buttonGroup} style={{ margin: "10px" }}>
            <button className={`${s.btn} ${s.btnPrimary}`}>
              <BtonCrear />
            </button>
            <button className={`${s.btn} ${s.btnEdit}`}>
              <BtnEdit />
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
            <input className={s.search} placeholder="Buscar..." />
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
