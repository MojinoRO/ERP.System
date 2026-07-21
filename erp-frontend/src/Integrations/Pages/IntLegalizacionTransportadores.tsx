import React, { useState } from "react";
import f from "../Pages/InvFormCompraEnBloque.module.css";
import { ErrorAlert } from "../../Components/UI/ErrorAlert";
import { getproveedores, ListarLegalizaciones } from "../Api/CompraEnBloque";
import { AutoComplete } from "../../Components/UI/AutoComplete";
import { type ListadoLegalizaciones, type Proveedores } from "../Types/Types";
import { BtnSearch } from "../../Components/component";
import { formatCurrency } from "../../Helper/CurrencyHelper";
import { CalcularRetencion } from "../../Helper/OperationsGenerales";
import { type ReportColumn } from "../../Components/Print/types";
import { ReportDocument } from "../../Components/Print/ReportDocument";
import { useReportPrint } from "../../Components/Print/UseReportPrint";

export default function IntLegalizacionTransportadores() {
  const [alert, SetAlert] = useState<{
    message: string;
    type: "error" | "success" | "warning";
  } | null>(null);
  const [transportadorSelected, setTransportadorSelected] =
    useState<Proveedores | null>(null);
  const [fechaDesdeSelected, setFechaDesdeSelected] = useState("");
  const [fechaHastaSelected, setFechaHastaSelected] = useState("");
  const [lista, setLista] = useState<ListadoLegalizaciones[]>();
  const { contentRef, print } = useReportPrint();

  const handleChanged = () => {
    if (!transportadorSelected) {
      return SetAlert({
        message: "Debe seleccionar transportador",
        type: "error",
      });
    }
    if (fechaDesdeSelected == "") {
      return SetAlert({ message: "fecha desde vacia", type: "error" });
    }
    if (fechaHastaSelected == "") {
      return SetAlert({ message: "fecha hasta vacia", type: "error" });
    }
    HandleSearch();
  };

  const HandleSearch = async () => {
    try {
      const data = await ListarLegalizaciones(
        fechaDesdeSelected,
        fechaHastaSelected,
        transportadorSelected?.tercerosID ?? 0,
      );
      if (data === null) {
        SetAlert({
          message: "Transportador sin viajes",
          type: "warning",
        });
      }
      setLista(data);
    } catch (error: any) {
      SetAlert({
        message: "Parametros invalidos",
        type: "warning",
      });
    }
  };

  const ChangedValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTransportadorSelected((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]:
          name == "cedula" ||
          name === "nombre" ||
          name === "celular" ||
          "observacion"
            ? value.toUpperCase()
            : value,
      };
    });
  };

  const calculartotalLitros = lista?.reduce(
    (act, f) => act + f.cantidadTotal,
    0,
  );
  const CalcularTotalGeneral = lista?.reduce(
    (act, f) => act + f.cantidadTotal * f.valorUnitario,
    0,
  );

  const valorRetefuente = CalcularRetencion(
    lista?.reduce((act, f) => act + f.valorTotal, 0) ?? 0,
    1,
  );

  const totalPagar = (CalcularTotalGeneral ?? 0) - valorRetefuente;

  const columnasImpresion: ReportColumn<ListadoLegalizaciones>[] = [
    { key: "items", label: "ítem", visible: true, render: (_r, i) => i + 1 },
    {
      key: "fecha",
      label: "fecha",
      visible: true,
      render: (r) => r.fechaLegalizacion,
    },
    {
      key: "Cantidad",
      label: "Cantidad Litros",
      visible: true,
      render: (r) => r.cantidadTotal,
    },
    {
      key: "VrUnitario",
      label: "VrUnitario",
      visible: true,
      render: (r) => formatCurrency(r.valorUnitario),
    },
    {
      key: "Total",
      label: "Total",
      visible: true,
      render: (r) => formatCurrency(r.valorTotal),
    },
  ];

  return (
    <div className={f.page}>
      <div className={f.header}>
        <h1 className={f.title}>Legalización Transportadores</h1>
        <p className={f.subtitle}>Liquidación de rutas por fechas</p>
      </div>
      {alert && (
        <ErrorAlert
          message={alert.message}
          type={alert.type}
          autoClose={3000}
          onClose={() => SetAlert(null)}
        />
      )}
      <div className={f.filterCard}>
        <div className={f.filterGrid}>
          <div className={f.field}>
            <AutoComplete
              label="Transportador:"
              placeHolder="Buscar transportador por nombre..."
              onSearch={getproveedores}
              getKey={(t) => t.tercerosID}
              getLabel={(t) =>
                `${t.tercerosIdentificacion} — ${t.tercerosNombres}`
              }
              onSelect={(t) => setTransportadorSelected(t)}
            />
          </div>
          <div className={f.field}>
            <label className={f.fieldLabel}>Fecha Desde:</label>
            <input
              className={f.control}
              type="date"
              onChange={(e) => setFechaDesdeSelected(e.target.value)}
            ></input>
          </div>

          <div className={f.field}>
            <label className={f.fieldLabel}>Fecha Hasta:</label>
            <input
              className={f.control}
              type="date"
              onChange={(e) => setFechaHastaSelected(e.target.value)}
            ></input>
          </div>

          <div className={f.field}>
            <button className={f.searchBtn} onClick={handleChanged}>
              <BtnSearch /> Filtar
            </button>
          </div>
        </div>
      </div>

      <div className={f.filterCard}>
        <div>
          <p className={f.subtitle}>Informacion del transportador</p>
          <div className={f.filterGrid}>
            <div className={f.field}>
              <label className={f.fieldLabel}>Nit / CC:</label>
              <input
                name="cedula"
                className={f.control}
                value={transportadorSelected?.tercerosIdentificacion ?? ""}
                onChange={ChangedValue}
                readOnly
              ></input>
            </div>
            <div className={f.field}>
              <label className={f.fieldLabel}>Nombre Trasnportador</label>
              <input
                className={f.control}
                value={transportadorSelected?.tercerosNombres ?? ""}
                onChange={ChangedValue}
                name="nombre"
                readOnly
              ></input>
            </div>
            <div className={f.field}>
              <label className={f.fieldLabel}>Contacto</label>
              <input
                className={f.control}
                value={transportadorSelected?.tercerosCelular ?? ""}
                onChange={ChangedValue}
                name="celular"
                readOnly
              ></input>
            </div>

            <div className={f.field}>
              <label className={f.fieldLabel}>Forma Pago:</label>
              <input
                className={f.control}
                value={transportadorSelected?.tercerosObservaciones ?? ""}
                onChange={ChangedValue}
                name="observacion"
                readOnly
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div className={f.tableCard}>
        <div className={f.tableCardHeader}>
          <span className={f.tableCardTitle}>Detalle de proveedores</span>
          <span className={f.tableCardCount}>
            {lista?.length ?? 0} registro(s)
          </span>
          <button
            className={f.searchBtn}
            onClick={print}
            disabled={lista == null}
          >
            Imprimir
          </button>
        </div>
        <div className={f.tableWrap}>
          <table className={f.table}>
            <thead>
              <tr>
                <th style={{ width: "20px" }}>Ítem</th>
                <th>Fecha</th>
                <th>Cant litros</th>
                <th>Vr Unitario</th>
                <th style={{ fontWeight: "bold", textAlign: "right" }}>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {lista?.map((d, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{d.fechaLegalizacion}</td>
                  <td>{d.cantidadTotal}</td>
                  <td>{formatCurrency(d.valorUnitario)}</td>
                  <td style={{ textAlign: "right" }}>
                    {formatCurrency(d.valorTotal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={f.totalesContainer}>
          <table className={f.totalesTable}>
            <tbody>
              <tr>
                <td>Cantidad Total</td>
                <td>{calculartotalLitros}</td>
              </tr>

              <tr>
                <td>Subtotal</td>
                <td>{formatCurrency(CalcularTotalGeneral ?? 0)}</td>
              </tr>

              <tr>
                <td>Descuentos</td>
                <td></td>
              </tr>

              <tr>
                <td>Retefuente</td>
                <td>{formatCurrency(valorRetefuente)}</td>
              </tr>

              <tr className={f.totalGeneral}>
                <td>TOTAL A PAGAR</td>
                <td>{formatCurrency(totalPagar)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div ref={contentRef}>
        <ReportDocument
          title="Legalización Transportadores"
          subtitle="Liquidación de rutas por fechas"
          meta={[
            {
              label: "Transportador",
              value: transportadorSelected?.tercerosNombres ?? "",
            },
            {
              label: "Rango",
              value: `${fechaDesdeSelected} a ${fechaHastaSelected}`,
            },
          ]}
          columns={columnasImpresion}
          data={lista ?? []}
          totals={[
            { label: "Cantidad Total", value: calculartotalLitros },
            {
              label: "Subtotal",
              value: formatCurrency(CalcularTotalGeneral ?? 0),
            },
            {
              label: "Descuentos",
              value: 0,
            },
            {
              label: "Retefuente",
              value: formatCurrency(valorRetefuente),
            },

            {
              label: "TOTAL A PAGAR",
              value: formatCurrency(totalPagar),
              emphasis: true,
            },
          ]}
          showSignatures
        />
        ;
      </div>
    </div>
  );
}
