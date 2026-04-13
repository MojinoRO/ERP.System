import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import styles from "./DashboardLayout.module.css";
import { TabsProvider } from "../../Context/TabContext";
import TabContent from "./TabContent";

export default function DashboardLayout() {
  return (
    <TabsProvider>
      <div className={styles.shell}>
        <Sidebar />
        <div className={styles.main}>
          <TopBar />
          <main className={styles.content}>
            <TabContent />
          </main>
        </div>
      </div>
    </TabsProvider>
  );
}
