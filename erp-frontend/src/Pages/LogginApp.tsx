import React, { useEffect, useState } from "react";
import styles from "../Components/PublicStyle.module.css";
import { getUsuarios, loginUser } from "../Api/LogginUser";
import type { loginReponse } from "../Types/LoginApp";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [usuarios, setUsuarios] = useState<loginReponse[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<string>("");
  const [viewUser, setViewUser] = useState(false);
  const [contraseña, setContraseña] = useState("");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
      console.log(data);
    } catch (error) {
      alert("No se ha podido cargar Usuario: " + error);
    }
  };

  const seleccionarUsuario = (user: loginReponse) => {
    setUsuarioSeleccionado(user.usuarioNombre);
    setViewUser(false);
  };

  const navigate = useNavigate();

  const HandledLoggin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!usuarioSeleccionado) {
      alert("Debe Seleccionar Usuarios");
    }
    if (!contraseña) {
      alert("Contraseña incorrecta");
    }
    console.log(usuarioSeleccionado + "  " + contraseña);
    try {
      const result = await loginUser({
        UsuarioNombre: usuarioSeleccionado,
        ContraseñaUsuario: contraseña,
      });
      console.log("LOGIN OK:", result);

      localStorage.setItem("token", result.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Credenciales Incorrecta");
    }
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
        <form style={{ margin: "20px" }} className={styles.form}>
          <h2 style={{ margin: "10px" }}>Iniciar Sesión</h2>

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
                    <div
                      style={{ color: "black" }}
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
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </div>

          <button type="submit" onClick={HandledLoggin}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};
