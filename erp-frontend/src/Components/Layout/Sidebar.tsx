import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'

const NAV_ITEMS = [
  { to: '/dashboard', label: '🏠 Dashboard'},
  { to: '/Contabilidad',     label: '📒 Contabilidad'},
  { to: '/Inventarios' , label: ' 📦 Inventarios'}
]

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>

      <div className={styles.logo}>
        MiApp
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

    </aside>
  )
}
