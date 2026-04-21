import { useEffect, useState } from "react";
import s from "../Style/FormVendedores.module.css";
import gs from "./shared.module.css"
import { type responseVendedores } from "../Types/ConfVendedores"
import {GetVendedores} from "../Api/ConfVendedores"

export default function ConfFormDigitadores() {
    const [lista, setLista]=useState<responseVendedores[]>([]);
    const[vendedorSelected, setVendedorSelected]=useState<responseVendedores | null>(null)
    const[btnActive, setBtnActive]=useState(false);

    useEffect(()=>{
        ChangedVendedores();
    },[])

    const ChangedVendedores = async ()=>{
        try{
            const data =await GetVendedores();
            setLista(data);
            setBtnActive(false)
        }catch(error){
            console.log(error);
            alert("Error al cargar Datos");
        }
    }

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
                                onChange={(e)=>{
                                    setVendedorSelected({
                                        ...vendedorSelected!,vendedorCodigo:e.target.value
                                    })
                                }}
                                disabled={!btnActive}
                            />
                        </div>

                        <div className={s.formGroup}>
                            <label>Nombre</label>
                            <input 
                                className={s.input} 
                                placeholder="Ingrese Nombre" 
                                value={vendedorSelected?.vendedorNombre}
                                disabled={!btnActive}
                                onChange={(e)=>{
                                    setVendedorSelected({
                                        ...vendedorSelected!,vendedorNombre:e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className={s.formGroup}>
                            <label>Identificación</label>
                            <input 
                                className={s.input} 
                                placeholder="Identificación" 
                                value={vendedorSelected?.vendedorIdentificacion}
                                disabled={!btnActive}
                                onChange={(e)=>{
                                    setVendedorSelected({
                                        ...vendedorSelected!,vendedorIdentificacion: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className={s.formGroup}>
                            <label>Estado</label>
                            <select className={s.select}
                                    value={vendedorSelected?.vendedorEstado}
                                    disabled={!btnActive}>
                                <option value="0">Activo</option>
                                <option value="1">Inactivo</option>
                            </select>
                        </div>

                    </div>

                    <div className={s.buttonGroup} style={{margin:"10px"}}>
                        <button className={`${gs.btn} ${gs.btnPrimary}`}>Crear</button>
                        <button className={`${gs.btn} ${gs.btnEdit}`}>Modificar</button>
                        <button className={`${gs.btn} ${gs.btnSuccess}`}>Guardar</button>
                        <button className={`${gs.btn} ${gs.btnDanger}`}>Eliminar</button>
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
                                <tr key={i}
                                    onClick={()=>setVendedorSelected(d)}
                                    className={vendedorSelected?.vendedorID === d.vendedorID ? s.selectedRow : ""}>
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