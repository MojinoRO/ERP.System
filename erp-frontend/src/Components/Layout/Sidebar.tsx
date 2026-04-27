import styles from "./Sidebar.module.css";
import { useTabs } from "../../Context/TabContext";
import Dashboard from "../../Pages/Dashboard";
import Inventarios from "../../Pages/Inventarios";
import ConfFormEmpresa from "../../Pages/ConfFormEmpresa";
import { useState } from "react";
import type React from "react";
import ConfFormDigitadores from "../../Pages/ConfFormDigitadores";
import ConfFormCategorias from "../../Pages/ConfFormCategorias";
import {ChevronDown} from "lucide-react"


interface NavChild {
  id: string;
  label: string;
  component: React.ReactNode;
}

interface NavTitle {
  id: string;
  label: string;
  children?: NavChild[];
}

interface NavItems {
  id: string;
  label: string;
  icon: string;
  component?: React.ReactNode;
  children?: NavTitle[];
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
    id: "Inventarios", // corregido typo
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
        id: "Basica",
        label: "Básica  ",
        children: [
          {
            id: "ConfEmpresa",
            label: "Datos Empresa",
            component: <ConfFormEmpresa />,
          },
          {
            id: "ConfVendedores",
            label: "Digitadores",
            component: <ConfFormDigitadores />,
          },
        ],
      },
      {
        id: "Inventarios",
        label: "Inventarios ",
        children: [
          {
            id: "ConfCategorias",
            label: "Categorías Artículos",
            component: <ConfFormCategorias />,
          },
        ],
      },
    ],
  },
];

export default function Sidebar() {
  const { openTab, activeId } = useTabs();

  const [openMenu, setOpenMenus] = useState<string[]>([]);
  const [openSubMenu, setOpenSubMenus] = useState<string[]>([]);

  function toggleMenu(id: string) {
    setOpenMenus((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  }

  function toggleSubMenu(id: string) {
    setOpenSubMenus((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>MMC System</div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => {
          // 🔹 ITEM CON HIJOS (Nivel 1)
          if (item.children) {
            const isOpen = openMenu.includes(item.id);

            return (
              <div key={item.id}>
                <button
                  className={styles.menuParent}
                  onClick={() => toggleMenu(item.id)}
                >
                  <span>
                    {item.icon} {item.label}
                  </span>
                  <span className={isOpen ? styles.arrowOpen : styles.arrow}>
                    <ChevronDown 
                    size={12}
                    style={{
                      transition:'transform 0.2s ease',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}/>
                  </span>
                </button>

                {/* NIVEL 2 */}
                {isOpen && (
                  <div className={styles.submenu}>
                    {item.children.map((group) => {
                      const isSubOpen = openSubMenu.includes(group.id);

                      return (
                        <div key={group.id}>
                          {/* TITULO NIVEL 2 */}
                          <button
                            className={styles.submenuTitle}
                            onClick={() => toggleSubMenu(group.id)}
                          >
                            {group.label}
                            <span
                              className={
                                isSubOpen ? styles.arrowOpen : styles.arrow
                              }
                            >
                              <ChevronDown
                              size={12}
                              style={{
                                transition:'transform 0.2s ease',
                                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                              }}/>
                            </span>
                          </button>

                          {/* NIVEL 3 */}
                          {isSubOpen && (
                            <div className={styles.submenuChild}>
                              {group.children?.map((child) => (
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
                    })}
                  </div>
                )}
              </div>
            );
          }

          // 🔹 ITEM NORMAL
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
              {item.icon} {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
