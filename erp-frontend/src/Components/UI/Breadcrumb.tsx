import styles from './Breadcrumb.module.css';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className={styles.breadcrumb}>
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          {index > 0 && <span className={styles.separator}>/</span>}
          {item.href ? (
            <a href={item.href} className={styles.link}>
              {item.label}
            </a>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
