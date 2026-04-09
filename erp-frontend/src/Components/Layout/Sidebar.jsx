import {NavLink} from  "react-router-dom"
import styles from "./SideBar.Moduele.css"

 const NAV_ITEMS = [
    {to:"/dashboard", label:"🏠 Dashboard"},
    {to:"/user", label:"👥 Usuarios"}
 ]

export default function SideBar(){
   return(
     <aside className={styles.SideBar}>

        <div className={styles.logo}>
            ERP System 
        </div>

        <nav className={styles.nav}>
            {NAV_ITEMS.map((items) =>(
                <NavLink 
                key={items.to}
                to={items.to}
                className={({IsAactive})=> IsAactive ? styles.linkActive : styles.link}>
                {items.label}
                </NavLink>
            ))}
        </nav>
    </aside>
   )
}
