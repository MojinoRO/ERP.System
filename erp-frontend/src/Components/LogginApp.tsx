import {  useEffect, useState } from "react";
import styles from "./PublicStyle.module.css";
import { getUsuarios } from "../Api/LogginUser";
import type { loginReponse } from "../Types/LoginApp";

export const LoginPage = () => {
  
  const [usuarios, setUsuarios]=useState<loginReponse[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado]= useState<string>("");
  const [viewUser, setViewUser]=useState(false)

  useEffect (() =>{
    cargarUsuarios();
  },[])

  const cargarUsuarios= async () =>{
    try{
      const data = await getUsuarios();
      setUsuarios(data);
    }catch(error){
      alert("No se ha podido cargar Usuario: " + error)
    }
  }

    const seleccionarUsuario = (user: loginReponse) => {
    setUsuarioSeleccionado(user.UsuarioNombre);
    setViewUser(false);
  };

  return (
    <div className={styles.loginContainer}>
      {/* IZQUIERDA */}
      <div className={styles.leftPanel}>
        <div className={styles.overlay}>
          <img src="src/assets/mmc.png"></img>
          <h1 style={{color:"#0f203a", fontWeight:"bold"}}>ERP MMC</h1>
          <p style={{color:"#0f203a", fontWeight:"bold"}}>Gestión empresarial inteligente</p>
        </div>
      </div>

      {/* DERECHA */}
      <div className={styles.rightPanel}>
        <form className={styles.form}>
          <h2>Iniciar Sesión</h2>

          <div className={styles.inputGroup}>
            <label>Usuario:</label>
            <input value={usuarioSeleccionado} type="text" placeholder="Ingrese su usuario"
                   onDoubleClick={()=> setViewUser(true)}
                   onChange={(e)=> setUsuarioSeleccionado(e.target.value)}/>
          </div>
          {viewUser && (
            <div>
              <p>Tipo: {typeof usuarios}</p>
    <p>Es array: {Array.isArray(usuarios) ? "SI" : "NO"}</p>
    <p>Length: {usuarios?.length}</p>
            </div>
          )}
          <div className={styles.inputGroup}>
            <label>Contraseña:</label>
            <input type="password" placeholder="Ingrese su contraseña" />
          </div>

          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};
