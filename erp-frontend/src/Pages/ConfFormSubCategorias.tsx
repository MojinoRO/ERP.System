import { useState } from "react";
import s from "./shared.module.css";
import {BtnEdit, BtnEliminar, BtnSave, BtonCrear} from "../Components/component"
export default function ConfFormSubCategorias(){
    const [formState , setFormState]=useState<"lectura"|"edicion">("edicion");
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
                                <input className={s.input}></input>
                                
                                <label className={s.label}>Nombre Subcategoría</label>
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
                        <button className={`${s.btn} ${s.btnPrimary}`}><BtonCrear/></button>
                        <button className={`${s.btn} ${s.btnEdit}`}><BtnEdit/> </button>
                        <button className={`${s.btn} ${s.btnSuccess}`}> <BtnSave/></button>
                        <button className={`${s.btn} ${s.btnDanger}`}> <BtnEliminar/> </button>
                    </div>
                </div>
            </div>
        </div>
    )
}