import { useState } from 'react';
import { LogOut, Settings, User } from 'lucide-react';
import styles from './UserMenu.module.css';

interface UserMenuProps {
  userName?: string;
  userInitials?: string;
  onLogout?: () => void;
}

export function UserMenu({
  userName = 'Usuario',
  userInitials = 'U',
  onLogout,
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Logout por defecto
      localStorage.removeItem('token');
      window.location.href = '/';
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.userMenu}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.avatar}>{userInitials}</div>
        <div className={styles.info}>
          <span className={styles.userName}>{userName}</span>
        </div>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.userInfo}>
            <div className={styles.avatarLarge}>{userInitials}</div>
            <div>
              <p className={styles.userName}>{userName}</p>
              <p className={styles.userEmail}>usuario@empresa.com</p>
            </div>
          </div>

          <div className={styles.divider}></div>

          <button className={styles.dropdownItem}>
            <User size={18} />
            <span>Mi Perfil</span>
          </button>

          <button className={styles.dropdownItem}>
            <Settings size={18} />
            <span>Configuración</span>
          </button>

          <div className={styles.divider}></div>

          <button
            className={`${styles.dropdownItem} ${styles.danger}`}
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      )}
    </div>
  );
}
