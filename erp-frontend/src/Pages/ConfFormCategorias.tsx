import s from "./shared.module.css";

// Filas fijas de cuentas contables — añadir o quitar aquí sin tocar el JSX
const CUENTAS = [
  { label: "Ingresos" },
  { label: "Devoluciones venta" },
  { label: "Costo (14)" },
  { label: "Costo (61)" },
  { label: "Compras" },
  { label: "Dev. compras" },
  { label: "IVA ventas" },
  { label: "IVA compras" },
] as const;

const NATURALEZA_OPTIONS = ["C", "D"] as const;

export default function ConfFormCategorias() {
  return (
    <div className={s.container}>
      <h2 className={s.pageTitle}>Configuración de Categorías</h2>

      <div className={s.grid}>
        {/* ── Panel izquierdo: formulario ── */}
        <div className={s.formulario}>
          {/* Sección: información general */}
          <h3 className={s.sectionTitle}>Información general</h3>

          {/* Fila 1: Código + Nombre */}
          <div className={`${s.formRow} ${s.cols2}`}>
            <div className={s.formGroup}>
              <label className={s.label}>Código</label>
              <input className={s.input} placeholder="Cód." />
            </div>
            <div className={s.formGroup}>
              <label className={s.label}>Nombre</label>
              <input className={s.input} placeholder="Nombre categoría" />
            </div>
          </div>

          {/* Fila 2: Impuesto + Tarifa */}
          <div className={`${s.formRow} ${s.cols2}`}>
            <div className={s.formGroup}>
              <label className={s.label}>Impuesto a cargo</label>
              <select className={s.select}>
                <option value="0">IVA incluido</option>
                <option value="1">Exento</option>
                <option value="2">Excluido</option>
              </select>
            </div>
            <div className={s.formGroup}>
              <label className={s.label}>Tarifa IVA (%)</label>
              <input className={s.input} placeholder="0.00" />
            </div>
          </div>

          {/* Fila 3: Estado */}
          <div className={s.formGroup}>
            <label className={s.label}>Estado</label>
            <select className={s.select}>
              <option value="0">Activo</option>
              <option value="1">Inactivo</option>
            </select>
          </div>

          {/* Sección: cuentas contables */}
          <h3 className={s.sectionTitle} style={{ marginTop: 16 }}>
            Cuentas contables
          </h3>

          <div className={s.tableWrapper}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Cuenta</th>
                  <th>Cód. contable</th>
                  <th>Nombre</th>
                  <th>Naturaleza</th>
                </tr>
              </thead>
              <tbody>
                {CUENTAS.map(({ label }) => (
                  <tr key={label}>
                    <td>{label}</td>
                    <td>
                      <input className={s.input} placeholder="Ej. 410505" />
                    </td>
                    <td>
                      <input className={s.input} placeholder="Nombre cuenta" />
                    </td>
                    <td>
                      <select className={s.select}>
                        {NATURALEZA_OPTIONS.map((op) => (
                          <option key={op} value={op}>
                            {op}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Botones */}
          <div className={s.buttonGroup}>
            <button className={`${s.btn} ${s.btnPrimary}`}>Crear</button>
            <button className={`${s.btn} ${s.btnEdit}`}>Modificar</button>
            <button className={`${s.btn} ${s.btnSuccess}`}>Guardar</button>
            <button className={`${s.btn} ${s.btnDanger}`}>Eliminar</button>
          </div>
        </div>

        {/* ── Panel derecho: listado ── */}
        <div className={s.list}>
          <div className={s.listHeader}>
            <h3>Listado de categorías</h3>
            <input className={s.search} placeholder="Buscar..." />
          </div>

          <table className={s.table}>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody />
          </table>
        </div>
      </div>
    </div>
  );
}
