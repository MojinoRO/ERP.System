import styles from "./TopBar.module.css";

export default function TopBar() {
  return (
    <header className={styles.topbar}>
      <span className={styles.title}>Bienvenido 👋</span>
      <div className={styles.right}>
        <span className={styles.avatar}>JD</span>
      </div>
    </header>
  );
}
