import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import TabBar from "./TapBar"; // ← agregar este import
import TabContent from "./TabContent";
import styles from "./DashboardLayout.module.css";
import { TabsProvider } from "../../Context/TabContext";

export default function DashboardLayout() {
  return (
    <TabsProvider>
      <div className={styles.shell}>
        <Sidebar />
        <div className={styles.main}>
          <TopBar />
          <TabBar />
          <main className={styles.content}>
            <TabContent />
          </main>
        </div>
      </div>
    </TabsProvider>
  );
}
