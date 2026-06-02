import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const variantClass = styles[`btn-${variant}`] || styles['btn-primary'];
  const sizeClass = styles[`size-${size}`] || styles['size-md'];
  const fullWidthClass = fullWidth ? styles['full-width'] : '';

  return (
    <button
      className={`${styles.button} ${variantClass} ${sizeClass} ${fullWidthClass} ${className || ''}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className={styles.loading}>Cargando...</span>
      ) : (
        props.children
      )}
    </button>
  );
};
