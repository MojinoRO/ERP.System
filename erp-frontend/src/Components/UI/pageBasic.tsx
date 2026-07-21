import type React from "react";
import f from "./PageBasic.module.css";

interface PageBasicProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export const PageBasic = ({ title, subtitle, children }: PageBasicProps) => {
  return (
    <div className={f.page}>
      <div className={f.header}>
        {title && <h1 className={f.title}>{title}</h1>}
        {subtitle && <p className={f.subtitle}>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
};

interface FilterCardProps {
  children?: React.ReactNode;
}
export const FilterCard = ({ children }: FilterCardProps) => {
  return (
    <div className={f.filterCard}>
      <div className={f.filterGrid}>{children}</div>
    </div>
  );
};

interface FieldProps {
  label: string;
  children?: React.ReactNode;
}
export const Field = ({ children, label }: FieldProps) => {
  return (
    <div className={f.fieldLabel}>
      {label && <label className={f.label}>{label}</label>}
      {children}
    </div>
  );
};
