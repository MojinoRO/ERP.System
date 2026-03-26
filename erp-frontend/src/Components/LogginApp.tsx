import styles from "./PublicStyle.module.css";

export const LoginPage = () => {
  return (
    <div className={styles.loginContainer}>
      {/* IZQUIERDA */}
      <div className={styles.leftPanel}>
        <div className={styles.overlay}>
          <h1>ERP MMC</h1>
          <p>Gestión empresarial inteligente</p>
        </div>
      </div>

      {/* DERECHA */}
      <div className={styles.rightPanel}>
        <form className={styles.form}>
          <h2>Iniciar Sesión</h2>

          <div className={styles.inputGroup}>
            <label>Usuario</label>
            <input type="text" placeholder="Ingrese su usuario" />
          </div>

          <div className={styles.inputGroup}>
            <label>Contraseña</label>
            <input type="password" placeholder="Ingrese su contraseña" />
          </div>

          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};
