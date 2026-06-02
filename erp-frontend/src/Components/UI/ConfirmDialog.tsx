import { AlertCircle } from 'lucide-react';
import styles from './ConfirmDialog.module.css';
import { Button } from './Button';

interface ConfirmDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  open: boolean;
}

export const ConfirmDialog = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'warning',
  open,
}: ConfirmDialogProps) => {
  if (!open) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onCancel} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={`${styles.icon} ${styles[`icon-${type}`]}`}>
            <AlertCircle size={24} />
          </div>
          <h2 className={styles.title}>{title}</h2>
        </div>

        <p className={styles.message}>{message}</p>

        <div className={styles.footer}>
          <Button variant="secondary" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button variant={type === 'danger' ? 'danger' : 'primary'} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </>
  );
};
