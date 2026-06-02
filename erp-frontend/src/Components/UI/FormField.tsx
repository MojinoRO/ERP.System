import type { ReactNode } from 'react';
import styles from './FormField.module.css';

interface FormFieldProps {
  label?: string;
  error?: string;
  help?: string;
  required?: boolean;
  children: ReactNode;
  fullWidth?: boolean;
}

export const FormField = ({
  label,
  error,
  help,
  required,
  children,
  fullWidth = true,
}: FormFieldProps) => {
  return (
    <div className={`${styles.field} ${fullWidth ? styles.fullWidth : ''}`}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {children}
      {error && <span className={styles.error}>{error}</span>}
      {help && !error && <span className={styles.help}>{help}</span>}
    </div>
  );
};
