import { useTabs } from "../../Context/TabContext";
import styles from "./TabContent.module.css";

export default function TabContent() {
  const { tabs, activeId } = useTabs();

  if (tabs.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Selecciona una opción del menú para comenzar</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={
            tab.id === activeId ? styles.panelVisible : styles.panelHidden
          }
        >
          {tab.component}
        </div>
      ))}
    </div>
  );
}
