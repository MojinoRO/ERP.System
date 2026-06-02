import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  help?: string;
  required?: boolean;
}

export const Input = ({
  error,
  label,
  help,
  required,
  className,
  ...props
}: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        className={`${styles.input} ${error ? styles.error : ''} ${className || ''}`}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
      {help && !error && <span className={styles.helpText}>{help}</span>}
    </div>
  );
};
