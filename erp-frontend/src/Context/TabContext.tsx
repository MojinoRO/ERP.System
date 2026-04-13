import { createContext, useContext, useState, type ReactNode } from "react";

// Tipo de cada pestaña
interface Tab {
  id: string;
  label: string;
  component: ReactNode;
}

// Tipo del contexto
interface TabsContextType {
  tabs: Tab[];
  activeId: string | null;
  openTab: (tab: Tab) => void;
  closeTab: (id: string) => void;
  setActiveId: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

export function TabsProvider({ children }: { children: ReactNode }) {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  function openTab(tab: Tab) {
    const exists = tabs.find((t) => t.id === tab.id);
    if (exists) {
      setActiveId(tab.id);
    } else {
      setTabs((prev) => [...prev, tab]);
      setActiveId(tab.id);
    }
  }

  function closeTab(id: string) {
    const index = tabs.findIndex((t) => t.id === id);
    const newTabs = tabs.filter((t) => t.id !== id);
    setTabs(newTabs);

    if (id === activeId) {
      if (newTabs.length === 0) {
        setActiveId(null);
      } else {
        const newIndex = index > 0 ? index - 1 : 0;
        setActiveId(newTabs[newIndex].id);
      }
    }
  }

  return (
    <TabsContext.Provider
      value={{ tabs, activeId, openTab, closeTab, setActiveId }}
    >
      {children}
    </TabsContext.Provider>
  );
}

export function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("useTabs debe usarse dentro de TabsProvider");
  return context;
}
