import React, { useEffect, useState } from "react";
import {
  BtonCrear,
  BtnEdit,
  BtnCancel,
  BtnEliminar,
  BtnSave,
} from "../Components/component";
import s from "./shared.module.css";
import {type responseMarcas} from "../Types/ConfMarcas"
import { BuscadorMarcas, ListarMarcas } from "../Api/ConfMarcas";

export default function ConfMarcas() {

  const emptyMarca : responseMarcas ={
    marcaID : 0,
    codigoMarca: "",
    marcaNombre:"",
    estado: 0
  } 

  const [formState , setFormState] = useState<"lectura" | "edicion">("lectura");
  const [lisatdoMarcas , setListadomarcas] = useState<responseMarcas[]>([]);
  const [marcaselected , setMarcaSelected]=useState(emptyMarca);

  const getMarcas = async()=>{
    try{
      const listado = await ListarMarcas();
      setListadomarcas(listado);
    }catch(error:any){
      alert("Error al cargar Marcas");
      console.log(error.response.data);
    }
  }
  
  useEffect(()=>{
    getMarcas();
  },[])

  
  const HandledCreate = () =>{
    setMarcaSelected(emptyMarca);
    setFormState("edicion");
    }

  const handledChanged = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
    const {name , value} =e.target;

    setMarcaSelected({
      ...marcaselected,[name] :name === "marcaNombre" ?
      Number(value)
      :value.toUpperCase()
    })
  }

  return (
    <div className={s.container}>
      <h2 className={s.pageTitle}>Creación de marcas</h2>
      <div className={s.grid}>
        <div className={s.formulario}>
          <fieldset disabled={formState !=="edicion"} className={s.fieldset}>
            <h1 className={s.sectionTitle}>Información general</h1>
            <div className={`${s.formRow} ${s.cols2}`}>
              <div className={s.formGroup}>
                <label className={s.label}>Código</label>

                <input className={s.input}
                      value={marcaselected.codigoMarca}
                      onChange={handledChanged}></input>

                <label className={s.label}>Nombre Marca</label>
                <input className={s.input}
                      value={marcaselected.marcaNombre}
                      onChange={handledChanged}>
                </input>
                <label className={s.label}>Estado</label>
                <select className={s.select}
                        value={marcaselected.estado}
                        onChange={handledChanged}>
                  <option value="0">Activo</option>
                  <option value="1">Inactivo</option>
                </select>
              </div>
            </div>
          </fieldset>
          <div className={s.buttonGroup}>
            <button className={`${s.btn} ${s.btnPrimary}`}
                    disabled={formState !=="lectura"}
                    onClick={HandledCreate}>
              <BtonCrear />
            </button>

            <button className={`${s.btn} ${s.btnEdit}`}
                    disabled={formState !=="lectura"}>
              <BtnEdit />
            </button>

            <button className={`${s.btn} ${s.btnCancel}`}
                    disabled={formState !=="edicion"}>
              <BtnCancel />
            </button>

            <button className={`${s.btn} ${s.btnSuccess}`}
                  disabled={formState !=="edicion"}>
              <BtnSave />
            </button>

            <button className={`${s.btn} ${s.btnDanger}`}
                    disabled={formState !== "lectura"}>
              <BtnEliminar />
            </button>
          </div>
        </div>

        <div className={s.list}>
          <div className={s.listHeader}>
            <h2>Listado Marcas</h2>
            <input className={s.search} placeholder="Buscar ... "></input>
          </div>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nombre Marca</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {lisatdoMarcas.map((d,i)=>(
                <tr key={i}
                  onDoubleClick={()=> setMarcaSelected(d)}
                  className={marcaselected?.marcaID ==d.marcaID
                    ? s.selectedRow 
                    : ""
                  }>
                  <td>{d.codigoMarca}</td>
                  <td>{d.marcaNombre  }</td>
                  <td>{d.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
