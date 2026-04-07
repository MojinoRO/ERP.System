import "./layout.css";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">ERP System</h2>

      <ul className="menu">
        <li>Dashboard</li>

        <li className="menu-title">Ventas</li>
        <li>Facturación</li>
        <li>Notas</li>
        <li className="active">Listado comprobantes</li>

        <li className="menu-title">Inventario</li>
        <li>Productos</li>
      </ul>
    </div>
  );
};
