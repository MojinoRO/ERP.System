import React, { useEffect, useState } from "react";
import styles from "./TopBar.module.css";
import type {CargaDatosEmpresaResponse} from "../../Types/ConfEmpresa"
import { GetDatosEmpresa } from "../../Api/ConfEmpresaService";
import s from "../PublicStyle.module.css"

export default function TopBar() {

  const [datosEmpresa, setDatosEmpresa]=useState<CargaDatosEmpresaResponse>({
    EmpresaID: 0,
    EmpresaNit:"",
    EmpresaDv:"",
    EmpresaNombre:"",
    EmpresaRazonSocial:"",
    EmpresaRepresentanteLegal:"",
    EmpresaTelefono:"",
    EmpresaDireccion:"",
    EmpresaEmail:"",
    EmpresaKeyLicencia:""
  })

  const loadDatosEmpresa = async ()=>{
    try{
      const data = await GetDatosEmpresa();
      setDatosEmpresa(data)
    }catch(error){
      console.log(error);
      alert("Empresa Sin datos");
    }
  }

  useEffect(()=>{
    loadDatosEmpresa()
  },[])

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name , value}= e.target
    setDatosEmpresa({...datosEmpresa,[name]:value});
  }
  return (
    <header className={styles.topbar}>
      <span className={styles.title}>Bienvenido 👋</span>
      <input style={{color:"black", fontSize:"16px", fontWeight:"bold", textAlign:"center", width:"900px"}}
       value={datosEmpresa.EmpresaNombre} onChange={handleChange} disabled={true}></input>
      <div className={styles.right}>
        <span className={styles.avatar}>JD</span>
      </div>
    </header>
  );
}
