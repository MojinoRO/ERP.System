import styles from "./Sidebar.module.css";
import { useTabs } from "../../Context/TabContext";
import Dashboard from "../../Pages/Dashboard";
import Users from "../../Pages/User";

const NAV_ITEMS = [
  { id: "/dashboard", label: "🏠 Dashboard", component: <Dashboard /> },
  { id: "/Contabilidad", label: "📒 Contabilidad", component: <Users /> },
];

export default function Sidebar() {
  const { openTab, activeId } = useTabs();
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>MMC System</div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => openTab(item)}
            className={activeId === item.id ? styles.linkActive : styles.link}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
