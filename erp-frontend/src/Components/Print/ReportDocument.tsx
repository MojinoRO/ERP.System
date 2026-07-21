import s from "./ReportDocument.module.css";
import { type ReportColumn, type ReportTotal, type ReportMeta } from "./types";

interface Props<T> {
  title: string;
  subtitle?: string;
  meta?: ReportMeta[];
  columns: ReportColumn<T>[];
  data: T[];
  totals?: ReportTotal[];
  showSignatures?: boolean;
}

export function ReportDocument<T>({
  title,
  subtitle,
  meta,
  columns,
  data,
  totals,
  showSignatures,
}: Props<T>) {
  const visibleColumns = columns.filter((c) => c.visible);
  return (
    <div className={s.document}>
      <header className={s.letterhead}>
        {/* aquí luego va logo/nombre de la empresa, fijo para todo el ERP */}
        {title && <h1>{title}</h1>}
        {subtitle && <p className={s.subtitle}>{subtitle}</p>}
      </header>

      {meta && meta.length > 0 && (
        <section className={s.meta}>
          {meta.map((m) => (
            <div key={m.label}>
              <strong>{m.label}:</strong>
              {m.value}
            </div>
          ))}
        </section>
      )}

      <table className={s.table}>
        <thead>
          <tr>
            {visibleColumns.map((c) => (
              <th key={c.key} style={{ textAlign: c.align ?? "left" }}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {visibleColumns.map((c) => (
                <td key={c.key} style={{ textAlign: c.align ?? "left" }}>
                  {c.render(row, i)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {totals && (
        <table className={s.totals}>
          <tbody>
            {totals.map((t) => (
              <tr key={t.label} className={t.emphasis ? s.emphasis : ""}>
                <td>{t.label}</td>
                <td>{t.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showSignatures && (
        <footer className={s.signatures}>
          <div className={s.signLine}>Firma Transportador</div>
          <div className={s.signLine}>Firma Autoriza</div>
        </footer>
      )}
    </div>
  );
}
