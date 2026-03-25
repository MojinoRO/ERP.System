import styles from "./PublicStyle.module.css";

export const LoginPage = () => {
    return(
        <div className={styles.container}>
            <form className={styles.form}>
                <p className={styles.logo}>ERP MMC</p>
                <h2 className={styles.title}>Iniciar Sesión</h2>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Usuario:</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Ingrese Usuario..."
                        >
                    </input>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Contraseña:</label>
                    <input
                        className={styles.input}
                        type="password"
                        placeholder="Ingrese Contraseña..."
                        >
                    </input>
                </div>
            </form>
        </div>
    )
}