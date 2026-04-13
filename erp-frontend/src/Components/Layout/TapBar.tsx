import { useTabs } from "../../Context/TabContext";
import styles from "./TabBar.module.css";

export default function TabBar() {
  const { tabs, activeId, setActiveId, closeTab } = useTabs();

  if (tabs.length === 0) return null;

  return (
    <div className={styles.tabBar}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={tab.id === activeId ? styles.tabActive : styles.tab}
          onClick={() => setActiveId(tab.id)}
        >
          <span>{tab.label}</span>
          <button
            className={styles.close}
            onClick={(e) => {
              e.stopPropagation();
              closeTab(tab.id);
            }}
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}
