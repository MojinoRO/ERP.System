import { PageBasic } from "../../Components/UI/pageBasic";
import f from "./InvFormCompraEnBloque.module.css";
export default function InttInfoLiquidacionProveedor() {
  return (
    <PageBasic
      title="Planilla de liquidación de leche"
      subtitle="Resumen de ingresos, anticipos y saldo a pagar por periodo"
    >
      <div className={f.filterCard}>
        <div className={f.filterGrid}></div>
      </div>
    </PageBasic>
  );
}
