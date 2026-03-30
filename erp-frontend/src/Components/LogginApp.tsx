import { useEffect, useState } from "react";
import styles from "./PublicStyle.module.css";
import { getUsuarios } from "../Api/LogginUser";
import type { loginReponse } from "../Types/LoginApp";

export const LoginPage = () => {
  const [usuarios, setUsuarios] = useState<loginReponse[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<string>("");
  const [viewUser, setViewUser] = useState(false);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      alert("No se ha podido cargar Usuario: " + error);
    }
  };

  const seleccionarUsuario = (user: loginReponse) => {
    setUsuarioSeleccionado(user.usuarioNombre);
    setViewUser(false);
  };

  return (
    <div className={styles.loginContainer}>
      {/* IZQUIERDA */}
      <div className={styles.leftPanel}>
        <div className={styles.overlay}>
          <img src="src/assets/mmc.png" />
          <h1>ERP MMC</h1>
          <p>Gestión empresarial inteligente</p>
        </div>
      </div>

      {/* DERECHA */}
      <div className={styles.rightPanel}>
        <form className={styles.form}>
          <h2>Iniciar Sesión</h2>

          {/* INPUT USUARIO */}
          <div className={styles.inputGroup}>
            <label>Usuario:</label>

            <div className={styles.inputWrapper}>
              <input
                value={usuarioSeleccionado}
                type="text"
                placeholder="Ingrese su usuario"
                onDoubleClick={() => setViewUser(true)}
                onChange={(e) => setUsuarioSeleccionado(e.target.value)}
              />

              {/* DROPDOWN */}
              {viewUser && usuarios.length > 0 && (
                <div className={styles.dropdown}>
                  {usuarios.map((e, i) => (
                    <div style={{color:"black"}}
                      key={i}
                      className={styles.dropdownItem}
                      onClick={() => seleccionarUsuario(e)}
                    >
                      {e.usuarioNombre}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* PASSWORD */}
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