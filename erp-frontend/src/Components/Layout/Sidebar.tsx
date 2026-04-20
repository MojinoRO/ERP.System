import styles from "./Sidebar.module.css";
import { useTabs } from "../../Context/TabContext";
import Dashboard from "../../Pages/Dashboard";
import Users from "../../Pages/User";
import Inventarios from "../../Pages/Inventarios";
import ConfFormEmpresa from "../../Pages/ConfFormEmpresa";
import { useState } from "react";
import type React from "react";
import ConfFormDigitadores from "../../Pages/ConfFormDigitadores";


interface NavChild {
  id: string;
  label: string;
  component: React.ReactNode;
}

interface NavItems {
  id: string;
  label: string;
  icon: string;
  component?: React.ReactNode;
  children?: NavChild[];
}

const NAV_ITEMS: NavItems[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "🏠",
    component: <Dashboard />,
  },
  {
    id: "Contabilidad",
    label: "Contabilidad",
    icon: "📊",
  },

  {
    id: "Invetatios",
    label: "Inventarios",
    icon: "📦",
    component: <Inventarios />,
  },
  {
    id: "Configuracion",
    label: "Configuracion",
    icon: "⚙️",
    children: [
      {
        id: "ConfEmpresa",
        label: "DatosEmpresa",
        component: <ConfFormEmpresa />,
      },
        {
        id:"ConfVendedores",
        label:"Digitadores",
        component:<ConfFormDigitadores/>
      },
      {
        id: "ConfUsuarios",
        label: "Usuarios",
        component: <Users />,
      },
    ],
  },
];

export default function Sidebar() {
  const { openTab, activeId } = useTabs();

  //guardo los padres que estan abiertos
  const [openMenu, setOpenMenus] = useState<string[]>([]);

  function toggleMenu(id: string) {
    setOpenMenus((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>MMC System</div>
      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => {
          if (item.children) {
            const isOpen = openMenu.includes(item.id);
            return (
              <div key={item.id}>
                {/*Boton padre*/}
                <button
                  className={styles.menuParent}
                  onClick={() => toggleMenu(item.id)}
                >
                  <span>
                    {item.icon} {item.label}
                  </span>
                  <span className={isOpen ? styles.arrowOpen : styles.arrow}>
                    ⌵
                  </span>
                </button>
                {isOpen && (
                  <div className={styles.submenu}>
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        className={
                          activeId === child.id
                            ? styles.submenuItemActive
                            : styles.submenuItem
                        }
                        onClick={() => openTab(child)}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          //--items sin hijos
          return (
            <button
              key={item.id}
              className={activeId === item.id ? styles.linkActive : styles.link}
              onClick={() =>
                openTab({
                  id: item.id,
                  label: item.label,
                  component: item.component,
                })
              }
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
