import React, { useEffect, useState, type ReactElement } from "react";
import s from "./shared.module.css";
import {BtnEdit, BtnEliminar, BtnSave, BtonCrear} from "../Components/component"
import type {SubCategoriasResponse} from "../Types/ConfSubCategorias"
import { GetAllSubCategorias } from "../Api/ConfSubCategorias"


export default function ConfFormSubCategorias(){

    const emptySubCategorias : SubCategoriasResponse = {
        subCategoriaID : 0,
        categoriaID:0,
        subCategoriaCodigo:"",
        subCategoriaNombre:"",
        estado:0
    }
    const [formState , setFormState]=useState<"lectura"|"edicion">("edicion");
    const [listadoSubcategorias, setListaSubCategorias]=useState<SubCategoriasResponse[]>([]);
    const [subCategoriaSelected , setSubCategoriaSelected] =useState(emptySubCategorias);


    const ListarSubCategorias = async () => {
        try{
            const data = await GetAllSubCategorias();
            setListaSubCategorias(data)
        }catch(error:any){
            return console.log("Error al cargar SubCategorias",error.response?.data)
        }
    }
    useEffect(()=>{
        ListarSubCategorias()
    },[])

    const HandledChanged = (e : React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} =e.target;
        setListaSubCategorias({
            ...listadoSubcategorias,[name]: value.toUpperCase(),
        })
    }

    return(
        <div className={s.container}>
            <h2 className={s.pageTitle}>Subcategorías de artículos</h2>

            <div className={s.grid}>
                <div className={s.formulario}>
                    <fieldset className={s.fieldset} disabled={formState ==="lectura"}>
                        <h3 className={s.sectionTitle}>Información general</h3>
                        <div className={`${s.formRow} ${s.cols2}`}>

                            <div className={s.formGroup}>
                                <label className={s.label}>Categoria</label>
                                <select className={s.select}>

                                </select>

                                <label className={s.label}>Código</label>
                                <input className={s.input}
                                value={subCategoriaSelected.subCategoriaCodigo}
                                onChange={HandledChanged}></input>
                                
                                <label className={s.label}>Nombre Subcategoría</label>
                                <input className={s.input}
                                value={subCategoriaSelected.subCategoriaNombre}
                                onChange={HandledChanged}></input>

                                <label className={s.label}>Estado</label>
                                <select className={s.select}
                                value={subCategoriaSelected.estado}>
                                    <option value="0">Activo</option>
                                    <option value="1">Inactivo</option>
                                </select>
                            </div>
                        </div>
                    </fieldset> 
                    <div className={s.buttonGroup}>
                        <button className={`${s.btn} ${s.btnPrimary}`}><BtonCrear/></button>
                        <button className={`${s.btn} ${s.btnEdit}`}><BtnEdit/> </button>
                        <button className={`${s.btn} ${s.btnSuccess}`}> <BtnSave/></button>
                        <button className={`${s.btn} ${s.btnDanger}`}> <BtnEliminar/> </button>
                    </div>
                </div>

                <div className={s.list}>
                    <div className={s.listHeader}>
                        <h3 >Listado Subcategorías </h3>
                        <input className={s.search} placeholder="Ingrese Nombre Subcategorías ... "></input>
                    </div>
                    
                    <table className={`${s.table} ${formState !== "lectura" ? s.disabled : ""}`}>
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Estado</th>
                            </tr>
                        </thead>

                        <tbody>
                            {listadoSubcategorias.map((d,i) => (
                                <tr 
                                key={i}
                                onClick={()=>setSubCategoriaSelected(d)}
                                className={subCategoriaSelected?.subCategoriaCodigo === d.subCategoriaCodigo 
                                        ? s.selectedRow : "" }>
                                    <td>{d.subCategoriaCodigo}</td>
                                    <td>{d.subCategoriaNombre}</td>
                                    <td>{d.estado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}