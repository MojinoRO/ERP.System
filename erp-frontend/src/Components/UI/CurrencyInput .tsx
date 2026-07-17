import type { InputHTMLAttributes } from "react";
import { formatCurrency, parseCurrency } from "../../Helper/CurrencyHelper";
import styles from "./Input.module.css";

interface CurrencyInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: number;
  onChange: (value: number) => void;
  error?: string;
  label?: string;
  help?: string;
  required?: boolean;
}

export const CurrencyInput = ({
  value,
  onChange,
  error,
  label,
  help,
  required,
  className,
  ...props
}: CurrencyInputProps) => {
  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        className={`${styles.input} ${error ? styles.error : ""} ${className || ""}`}
        inputMode="numeric"
        value={formatCurrency(value)}
        onChange={(e) => onChange(parseCurrency(e.target.value))}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
      {help && !error && <span className={styles.helpText}>{help}</span>}
    </div>
  );
};
