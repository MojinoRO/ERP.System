import { AlertCircle, X } from 'lucide-react';
import styles from './ErrorAlert.module.css';

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
  type?: 'error' | 'success' | 'warning' | 'info';
  autoClose?: number;
}

export const ErrorAlert = ({
  message,
  onClose,
  type = 'error',
  autoClose,
}: ErrorAlertProps) => {
  if (autoClose) {
    setTimeout(() => {
      onClose?.();
    }, autoClose);
  }

  return (
    <div className={`${styles.alert} ${styles[`alert-${type}`]}`}>
      <div className={styles.content}>
        <AlertCircle size={20} />
        <p className={styles.message}>{message}</p>
      </div>
      {onClose && (
        <button className={styles.close} onClick={onClose}>
          <X size={18} />
        </button>
      )}
    </div>
  );
};
