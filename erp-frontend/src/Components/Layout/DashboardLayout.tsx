import { Outlet } from 'react-router-dom'
import Sidebar from "./Sidebar"
import TopBar from "./TopBar"
import styles from './DashboardLayout.module.css'

export default function DashboardLayout() {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.main}>
        <TopBar />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>

    </div>
  )
}