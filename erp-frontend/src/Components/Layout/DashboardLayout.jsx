import {Outlet} from "react-router-dom"
import SideBar from "./Sidebar"
import TopBar from "./TopBar"
import styles from './DashboardLayout.module.css'

export default function(){
    return(
        <div className={styles.main}>
            {/* Columna izquierda */}
            <SideBar/>
            
            {/* Columna derecha */}
            <div className={styles.main}>
                <TopBar/>
                {/* Aquí React Router pone la página según la URL */}
                <main className={styles.content}>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}