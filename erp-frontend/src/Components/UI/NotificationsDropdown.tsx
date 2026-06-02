import { useState } from 'react';
import { Bell } from 'lucide-react';
import styles from './NotificationsDropdown.module.css';

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  // Mock notifications - reemplazar con datos reales después
  const notifications: Notification[] = [
    {
      id: '1',
      message: 'Nueva orden de compra recibida',
      timestamp: 'Hace 5 minutos',
      read: false,
    },
    {
      id: '2',
      message: 'Inventario bajo para producto XYZ',
      timestamp: 'Hace 1 hora',
      read: false,
    },
    {
      id: '3',
      message: 'Reporte mensual listo',
      timestamp: 'Hace 2 horas',
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className={styles.container}>
      <button
        className={styles.notificationsButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className={styles.badge}>{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.header}>
            <h3>Notificaciones</h3>
            {unreadCount > 0 && (
              <button className={styles.markRead}>Marcar todas como leídas</button>
            )}
          </div>
          <div className={styles.list}>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`${styles.item} ${
                    !notification.read ? styles.unread : ''
                  }`}
                >
                  <div className={styles.content}>
                    <p className={styles.message}>{notification.message}</p>
                    <span className={styles.time}>{notification.timestamp}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.empty}>No hay notificaciones</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
