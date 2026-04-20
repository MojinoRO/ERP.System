import { useState } from "react";
import s from "../Style/FormVendedores.module.css";
import gs from "./shared.module.css"

interface Vendedores {
    VendedorID: number;
    CodigoVendedor: string;
    IdentificacionVendedor: string;
    NombreVendedor: string;
    EstadoVendedor: number;
}

export default function ConfFormDigitadores() {
    const [form, setform] = useState<Vendedores>({
        VendedorID: 0,
        CodigoVendedor: "",
        IdentificacionVendedor: "",
        NombreVendedor: "",
        EstadoVendedor: 0       
    });

    const [Lista, SetLista] = useState<Vendedores[]>([]);

    return (
        <div className={s.container}>
            <h2 className={s.cardHeader}>Configuración de Digitadores</h2>

            <div className={s.grid}>

                {/* 🟦 FORMULARIO */}
                <div className={s.formulario}>

                    <div className={s.formRow}>

                        <div className={s.formGroup}>
                            <label>Código</label>
                            <input 
                                className={`${s.input} ${s.codigo}`} 
                                placeholder="Código" 
                                value={form.CodigoVendedor}
                            />
                        </div>

                        <div className={s.formGroup}>
                            <label>Nombre</label>
                            <input 
                                className={s.input} 
                                placeholder="Ingrese Nombre" 
                                value={form.NombreVendedor}
                            />
                        </div>

                        <div className={s.formGroup}>
                            <label>Identificación</label>
                            <input 
                                className={s.input} 
                                placeholder="Identificación" 
                                value={form.IdentificacionVendedor}
                            />
                        </div>

                        <div className={s.formGroup}>
                            <label>Estado</label>
                            <select className={s.select}>
                                <option value="0">Activo</option>
                                <option value="1">Inactivo</option>
                            </select>
                        </div>

                    </div>

                    {/* 🔥 BOTONES */}
                    <div className={s.buttonGroup} style={{margin:"10px"}}>
                        <button className={`${gs.btn} ${gs.btnPrimary}`}>Crear</button>
                        <button className={`${gs.btn} ${gs.btnEdit}`}>Modificar</button>
                        <button className={`${gs.btn} ${gs.btnSuccess}`}>Guardar</button>
                        <button className={`${gs.btn} ${gs.btnDanger}`}>Eliminar</button>
                    </div>

                </div>

                {/* 🟩 LISTADO */}
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
                            {Lista.map((d, i) => (
                                <tr key={i}>
                                    <td>{d.CodigoVendedor}</td>
                                    <td>{d.NombreVendedor}</td>
                                    <td>{d.EstadoVendedor === 0 ? "Activo" : "Inactivo"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            </div>
        </div>
    );
}