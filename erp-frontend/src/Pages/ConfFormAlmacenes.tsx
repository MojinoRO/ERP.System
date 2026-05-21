import {BtonCrear,BtnEdit,BtnCancel,BtnEliminar,BtnSave} from "../Components/component"
import s from "./shared.module.css"
import {type ResponseAlmacenes} from "../Types/ConfAlmacenes";
import { ListarAlmacenesBD} from "../Api/ConfAlmacenes"
import { useEffect, useState } from "react";

export default function ConfAlmacenes(){
    const emptyAlmacen : ResponseAlmacenes ={
        almacenID : 0,
        almacenCodigo:"",
        almacenNombre:"",
        estado:0
    }
    const [formState , setFormState] =useState<"lectura"|"edicion">("lectura");
    const [almacenSelected,setAlmacenSelected]=useState(emptyAlmacen);
    const [listadoAlmacen, setListadoAlmacen]=useState<ResponseAlmacenes[]>([]);

    const ListarAlmacen = async()=>{
        try{
            const listado = await ListarAlmacenesBD();
            setListadoAlmacen(listado)
        }catch(error:any){
            console.log(error?.response.data);
        }
    }

    useEffect(()=>{
        ListarAlmacen();
    },[])

    return(
        <div className={s.container}>
            <h2 className={s.pageTitle}>Creación de Almacenes</h2>
            <div className={s.grid}>
                <div className={s.formulario}>
                    <fieldset className={s.fieldset}>
                        <h1 className={s.sectionTitle}>Información general </h1>
                        <div className={`${s.formRow} ${s.cols2}`}>
                            <div className={s.formGroup}>
                                <label className={s.label}>Código</label>
                                <input className={s.input}></input>
                                <label className={s.label}>Nombre Almacen</label>
                                <input className={s.input}></input>
                                <label className={s.label}>Estado</label>
                                <select className={s.select}>
                                    <option value="0">Activo</option>
                                    <option value="1">Inactivo</option>
                                </select>
                            </div>
                        </div>
                    </fieldset>
                    <div className={s.buttonGroup}>
                        <button className={`${s.btn} ${s.btnPrimary}`}>
                            <BtonCrear/>
                        </button>
                        
                        <button className={`${s.btn} ${s.btnEdit}`}>
                            <BtnEdit/>
                        </button>

                        <button className={`${s.btn} ${s.btnCancel}`}>
                            <BtnCancel/>
                        </button>

                        <button className={`${s.btn} ${s.btnSuccess}`}>
                            <BtnSave/>
                        </button>

                        <button className={`${s.btn} ${s.btnDanger}`}>
                            <BtnEliminar/>
                        </button>
                       
                    </div>
                </div>

                <div className={s.list}>
                    <div className={s.listHeader}>
                        <h2>Listado Almacenes</h2>
                        <input className={s.search}
                        placeholder="Buscar ... "></input>
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}