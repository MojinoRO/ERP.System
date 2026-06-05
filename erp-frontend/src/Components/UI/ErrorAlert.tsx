import { AlertCircle, X } from "lucide-react";
import styles from "./ErrorAlert.module.css";
import { useEffect } from "react";

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
  type?: "error" | "success" | "warning" | "info";
  autoClose?: number;
}

export const ErrorAlert = ({
  message,
  onClose,
  type = "error",
  autoClose,
}: ErrorAlertProps) => {
  useEffect(() => {
    if (!autoClose) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, autoClose);
    return () => clearTimeout(timer);
  });
  return (
    <div className={`${styles.alert} ${styles[`alert-${type}`]}`}>
      <div className={styles.content}>
        <AlertCircle size={20}></AlertCircle>
        <p className={styles.message}>{message}</p>
      </div>
      {onClose && (
        <button className={styles.close} onClick={onClose}>
          <X size={18} />
        </button>
      )}
      {autoClose && (
        <div
          className={styles.progress}
          style={{ animationDuration: `${autoClose}ms` }}
        ></div>
      )}
    </div>
  );
};
