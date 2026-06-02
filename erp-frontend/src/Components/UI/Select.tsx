import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Select.module.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  help?: string;
  required?: boolean;
  options: Array<{ value: string | number; label: string }>;
}

export const Select = ({
  error,
  label,
  help,
  required,
  options,
  className,
  ...props
}: SelectProps) => {
  return (
    <div className={styles.selectWrapper}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.selectContainer}>
        <select
          className={`${styles.select} ${error ? styles.error : ''} ${className || ''}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className={styles.icon} size={18} />
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
      {help && !error && <span className={styles.helpText}>{help}</span>}
    </div>
  );
};
