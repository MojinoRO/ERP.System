import styles from "./TopBar.module.css";
import { useTabs } from "../../Context/TabContext";

export default function TopBar() {
  const { tabs, activeId, setActiveId, closeTab } = useTabs();
  if (tabs.length === 0) return null;
  return (
    <div className={styles.topbar}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={tab.id === activeId ? styles.tabactive : styles.tab}
          onClick={() => setActiveId(tab.id)}
        >
          <span>[tab.label]</span>
          <button
            className={styles.close}
            onClick={(e) => {
              e.stopPropagation();
              closeTab(tab.id);
            }}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}
