import {  useEffect, useState } from "react";
import s from "../Style/FormVendedores.module.css";
import gs from "./shared.module.css";
import { type responseVendedores } from "../Types/ConfVendedores";
import { GetVendedores, UpdatVendedores, CreateVendedores, deleteVendedores } from "../Api/ConfVendedores";



export default function ConfFormDigitadores() {
  const [lista, setLista] = useState<responseVendedores[]>([]);
  const [vendedorSelected, setVendedorSelected] =
    useState<responseVendedores | null>(null);
  const [formActive, setformActive] = useState(false);

  const [btnCreate, setbtnCreate] = useState(true);
  const [btnEdit, setbtnEdit] = useState(true);
  const [btnSave, setbtnSave] = useState(true);
  const [btnDelete, setbtnDelete] = useState(true);

  const handledCreate = () => {
    if (vendedorSelected) {
      alert("Hay datos cargados, guarde o limpie antes");
      console.log(vendedorSelected);
      return;
    }
    setVendedorSelected({
      vendedorID: 0,
      vendedorCodigo: "",
      vendedorIdentificacion: "",
      vendedorNombre: "",
      vendedorEstado: 0,
    });

    setformActive(true);
    setbtnDelete(false);
    setbtnEdit(false);
    setbtnCreate(false);
    setbtnSave(true);
  };

  const handledEdit = () => {
    if (!vendedorSelected) {
      alert("Debe seleccionar Vendedor a Modificar");
      return;
    }
    setformActive(true);
    setbtnDelete(false);
    setbtnEdit(false);
    setbtnCreate(false);
    setbtnSave(true);
  };
  

  const validarVendedor = (v: responseVendedores)=>{
    if(!v.vendedorCodigo?.trim()){
      alert("Debe asignar código de vendedo")
      return false;
    }
    if(!v.vendedorIdentificacion?.trim()){
      alert("Debe asignar identificación de vendedor");
      return false;
    }
    if(!v.vendedorNombre?.trim()){
      alert("Debe asignar nombre de vendedor");
      return false;
    }
    return true;
  }

  const handledSave = async()=>{ 
    try{
      if(!vendedorSelected){
        alert("No hay datos para guardar");
        return;
      }
      if(!validarVendedor(vendedorSelected!))return;
      let ok = false;
      if(vendedorSelected?.vendedorID ===0){
        ok = await CreateVendedores(vendedorSelected);
        alert(ok ? "Vendedor Creado Correctamente" : "Error Al Crear Vendedor");
        console.log(vendedorSelected);
      }else{
        ok= await UpdatVendedores(vendedorSelected);
        alert(ok ? "Vendedor Actualizado Correctamente" : "Error Al Actualizar Vendedor")
      }
      // Reset UI 
      setformActive(false);
      setbtnCreate(true);
      setbtnDelete(true);
      setbtnEdit(true);
      setbtnSave(true);
      setVendedorSelected(null);
      ChangedVendedores();

    }catch(error:any){
      alert("Error al Guardar vendedor");
      console.log(error.response?.data);
    }
  }

  const handledDelete = async () =>{
    try{
      let ok = false;
      if(!vendedorSelected){
        alert("Debe Seleccionar Vendedor A Eliminar");
        return;
      }
      const confirmation = window.confirm("Estas seguro de eliminar Vendedor");
      if(!confirmation)return;
      ok = await deleteVendedores(vendedorSelected);
      alert(ok ? "Vendedor Eliminado correctamente " : "Error al Eliminar Vendedor");
       // Reset UI 
      setformActive(false);
      setbtnCreate(true);
      setbtnDelete(true);
      setbtnEdit(true);
      setbtnSave(true);
      setVendedorSelected(null);
      ChangedVendedores();

    }catch(error){
      return(error)
    }
  }

  useEffect(() => {
    ChangedVendedores();
  }, []);

  const ChangedVendedores = async () => {
    try {
      const data = await GetVendedores();
      setLista(data);
      setformActive(false);
    } catch (error) {
      console.log(error);
      alert("Error al cargar Datos");
    }
  };

  return (
    <div className={s.container}>
      <h2 className={s.cardHeader}>Configuración de Digitadores</h2>

      <div className={s.grid}>
        <div className={s.formulario}>
          <div className={s.formRow}>
            <div className={s.formGroup}>
              <label>Código</label>
              <input
                className={`${s.input} ${s.codigo}`}
                placeholder="Código"
                value={vendedorSelected?.vendedorCodigo}
                onChange={(e) => {
                  setVendedorSelected({
                    ...vendedorSelected!,
                    vendedorCodigo: e.target.value,
                  });
                }}
                disabled={!formActive}
              />
            </div>

            <div className={s.formGroup}>
              <label>Nombre</label>
              <input
                className={s.input}
                placeholder="Ingrese Nombre"
                value={vendedorSelected?.vendedorNombre}
                disabled={!formActive}
                onChange={(e) => {
                  setVendedorSelected({
                    ...vendedorSelected!,
                    vendedorNombre: e.target.value,
                  });
                }}
              />
            </div>

            <div className={s.formGroup}>
              <label>Identificación</label>
              <input
                className={s.input}
                placeholder="Identificación"
                value={vendedorSelected?.vendedorIdentificacion}
                disabled={!formActive}
                onChange={(e) => {
                  setVendedorSelected({
                    ...vendedorSelected!,
                    vendedorIdentificacion: e.target.value,
                  });
                }}
              />
            </div>

            <div className={s.formGroup}>
              <label>Estado</label>
              <select
                className={s.select}
                value={vendedorSelected?.vendedorEstado}
                disabled={!formActive}
                onChange={(e)=>{
                  setVendedorSelected({
                    ...vendedorSelected!,vendedorEstado:Number(e.target.value)
                  })
                }}
              >
                <option value="0">Activo</option>
                <option value="1">Inactivo</option>
              </select>
            </div>
          </div>

          {/**BOTONES */}

          <div className={s.buttonGroup} style={{ margin: "10px" }}>
            <button
              className={`${gs.btn} ${gs.btnPrimary}`}
              disabled={!btnCreate}
              onClick={handledCreate}
            >
              Crear
            </button>
            <button
              className={`${gs.btn} ${gs.btnEdit}`}
              disabled={!btnEdit}
              onClick={handledEdit}
            >
              Modificar
            </button>
            <button
              className={`${gs.btn} ${gs.btnSuccess}`}
              disabled={!btnSave}
              onClick={handledSave}
            >
              Guardar
            </button>
            <button
              className={`${gs.btn} ${gs.btnDanger}`}
              disabled={!btnDelete}
            >
              Eliminar
            </button>
          </div>
        </div>

        <div className={s.list}>
          <div className={s.listHeader}>
            <h3>Listado Digitadores</h3>
            <input className={s.search} placeholder="Buscar..." />
          </div>

          <table className={s.table}>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              {lista.map((d, i) => (
                <tr
                  key={i}
                  onClick={()=> setVendedorSelected(d)}
                  className={
                    vendedorSelected?.vendedorID === d.vendedorID
                      ? s.selectedRow
                      : ""
                  }
                >
                  <td>{d.vendedorCodigo}</td>
                  <td>{d.vendedorNombre}</td>
                  <td>{d.vendedorEstado === 0 ? "Activo" : "Inactivo"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
