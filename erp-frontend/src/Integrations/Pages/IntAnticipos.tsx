import {
  BtonCrear,
  BtnEdit,
  BtnCancel,
  BtnSave,
  BtnEliminar,
  BtnSearch,
  BtnPrint,
} from "../../Components/component";
import React, { useState } from "react";
import { Field, PageBasic } from "../../Components/UI/pageBasic";
import s from "../../Pages/shared.module.css";
import f from "../Pages/InvFormCompraEnBloque.module.css";
import { AutoComplete } from "../../Components/UI/AutoComplete";
import { getproveedores } from "../Api/CompraEnBloque";
import { DateInput } from "../../Components/UI/DateInput";
import { CurrencyInput } from "../../Components/UI/CurrencyInput ";
import { ErrorAlert } from "../../Components/UI/ErrorAlert";
import {
  CreateAnticipos,
  GetListAnticiposProveedores,
} from "../Api/IntAnticipos";
import type { ReportColumn } from "../../Components/Print/types";
import { ReportDocument } from "../../Components/Print/ReportDocument";
import { useReportPrint } from "../../Components/Print/UseReportPrint";
import { ConfirmDialog } from "../../Components/UI/ConfirmDialog";
import type { AnticiposResponse } from "../Types/Types";
export default function IntAnticipos() {
  const emptyAnticipos = {
    anticipoID: 0,
    terceroID: 0,
    anticipoTipo: 0,
    anticipoFecha: "",
    anticipoDetalle: "",
    CoutasAnticipo: 0,
    valorAnticipo: 0,
  };
  const dateSearch = {
    proveedorID: 0,
    fechaDesde: "",
    fechaHasta: "",
    tipoAnticipo: 0,
  };
  const [alert, setAlert] = useState<{
    message: string;
    type: "error" | "success" | "warning";
  } | null>(null);
  const [form, setForm] = useState(emptyAnticipos);
  const [formState, setFormState] = useState<"lectura" | "edicion">("lectura");
  const [provedorSelected, setProveedorSelected] = useState("");
  const [cuotas, setCuotas] = useState<boolean>(false);
  const [anticipos, setAnticipos] = useState<(typeof emptyAnticipos)[]>([]);
  const { contentRef, print } = useReportPrint();
  const [confirmPrint, setConfirmPrint] = useState(false);
  const [search, setSearch] = useState(false);
  const [busqueda, setBusqueda] = useState(dateSearch);
  const [ListadoAnticipos, SetListadoAnticipos] = useState<AnticiposResponse[]>(
    [],
  );

  const ValidateForm = (): boolean => {
    if (form.terceroID === 0) {
      setAlert({ message: "Debe Seleccionar proveedor", type: "error" });
      return false;
    }
    if (form.anticipoFecha === "") {
      setAlert({ message: "Agregue Fecha Anticipo", type: "error" });
      return false;
    }
    if (form.anticipoDetalle === "") {
      setAlert({
        message: "Ingrese detalle anticipo",
        type: "error",
      });
      return false;
    }
    if (form.valorAnticipo === 0) {
      setAlert({ message: "Agregue Valor Anticipo", type: "error" });
      return false;
    }
    return true;
  };

  const validateFechas_ValorAnticipos = (): boolean => {
    const fechavacias = anticipos.filter((prev) => prev.anticipoFecha === "");
    const valorVacio = anticipos.filter((prev) => prev.valorAnticipo <= 0);
    if (fechavacias.length > 0 || valorVacio.length > 0) {
      setAlert({
        message: "Revise Fecha de anticipos o valor ",
        type: "error",
      });
      return false;
    }
    return true;
  };
  const handleCuotas = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!ValidateForm()) return;
    setCuotas(e.target.value === "true");
  };

  const CrearAnticiposXCuotas = (cantidad: number) => {
    if (cantidad == 0) return;
    if (cantidad > 3)
      return setAlert({
        message: "Numero Maximo de Cuotas alcanzado",
        type: "error",
      });
    const valorCouta = form.valorAnticipo / cantidad;
    const lista = Array.from({ length: cantidad }, (_) => ({
      ...form,
      anticipoID: 0,
      anticipoFecha: "",
      valorAnticipo: valorCouta,
      CoutasAnticipo: cantidad,
    }));
    setAnticipos(lista);
  };

  const handleCreate = () => {
    if (formState === "lectura") setFormState("edicion");
  };

  const handleCancel = () => {
    setForm(emptyAnticipos);
    setAnticipos([]);
    setCuotas(false);
    setProveedorSelected("");
    setFormState("lectura");
  };

  const handleSave = async () => {
    if (!ValidateForm()) return;
    try {
      const isNew = form.anticipoID === 0;
      if (isNew) {
        const isArray = anticipos.length !== 0;
        if (isArray) {
          if (!validateFechas_ValorAnticipos()) return;
          for (const anticipo of anticipos) {
            const created = await CreateAnticipos(anticipo);
            if (!created) {
              setAlert({
                message: "Error al guardar una cuota",
                type: "error",
              });
              return;
            }
          }
          setAlert({
            message: "Anticipo creado correctamente",
            type: "success",
          });
        } else {
          const created = await CreateAnticipos(form);
          if (!created) {
            return setAlert({
              message: "Ha ocurrido un error al crear anticipo",
              type: "error",
            });
          }
          setAlert({
            message: "Anticipo creado correctamente",
            type: "success",
          });
        }
      } else {
      }
      setConfirmPrint(true);
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const ColumnasImpresion: ReportColumn<typeof emptyAnticipos>[] = [
    { key: "Item", label: "Item", visible: true, render: (_r, i) => i + 1 },
    {
      key: "Fecha",
      label: "Fecha Anticipo",
      visible: true,
      render: (r) => r.anticipoFecha,
    },
    {
      key: "Detalle",
      label: "Detalle",
      visible: true,
      render: (r) => r.anticipoDetalle,
    },
    {
      key: "Valor",
      label: "Valor Anticipo",
      visible: true,
      render: (r) => r.valorAnticipo,
    },
  ];

  const ConfirmarImpresion = () => {
    print();
    setConfirmPrint(false);
    setForm(emptyAnticipos);
    setAnticipos([]);
    setCuotas(false);
    setProveedorSelected("");
    setFormState("lectura");
  };

  const handleActiveSearch = () => {
    if (anticipos.length > 0 || form.terceroID !== 0) return;
    setSearch(true);
  };

  const handleSearch = async () => {
    try {
      if (
        busqueda.fechaDesde === "" ||
        busqueda.fechaHasta === "" ||
        busqueda.proveedorID === 0
      )
        return;
      const data = await GetListAnticiposProveedores(busqueda);
      if (data.length > 0) {
        SetListadoAnticipos(data);
      } else {
        SetListadoAnticipos([]);
      }
    } catch (error: any) {
      console.log(error.response?.response);
    }
  };

  return (
    <PageBasic
      title="REGISTRO DE ANTICIPOS"
      subtitle="Formulario de generación y consulta de anticipos"
    >
      {alert && (
        <ErrorAlert
          message={alert.message}
          type={alert.type}
          autoClose={3000}
          onClose={() => setAlert(null)}
        />
      )}
      <div className={f.filterCard}>
        <div className={s.filterGrid}>
          <h3 className={s.sectionTitle}>Información General</h3>
          <fieldset className={s.fieldset} disabled={formState === "lectura"}>
            <Field label="Proveedor :">
              <AutoComplete
                placeHolder="Buscar proveedor por nombre..."
                onSelect={(p) => {
                  setForm((prev) => ({
                    ...prev,
                    terceroID: p.tercerosID,
                  }));
                  setProveedorSelected(p.tercerosNombres);
                }}
                onSearch={getproveedores}
                getKey={(p) => p.tercerosID}
                getLabel={(p) =>
                  `${p.tercerosIdentificacion} — ${p.tercerosNombres}`
                }
              ></AutoComplete>
            </Field>

            <Field label="Tipo Anticipo">
              <select
                className={s.select}
                value={form.anticipoTipo}
                onChange={(t) =>
                  setForm((prev) => ({
                    ...prev,
                    anticipoTipo: Number(t.target.value),
                  }))
                }
              >
                <option value={0}>Proveedor</option>
                <option value={1}>Transportador</option>
              </select>
            </Field>

            <Field label="Fecha Anticipo:">
              <DateInput
                value={form.anticipoFecha}
                onValueChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    anticipoFecha: e,
                  }))
                }
              ></DateInput>
            </Field>

            <Field label="Detalle Anticipo:">
              <input
                className={s.control}
                value={form.anticipoDetalle}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    anticipoDetalle: e.target.value.toUpperCase(),
                  }))
                }
              ></input>
            </Field>
            <div className={s.formGroupHorizontal4}>
              <label className={s.label} style={{ margin: "5px" }}>
                Valor Anticipo:
              </label>
              <CurrencyInput
                value={form.valorAnticipo}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    valorAnticipo: Number(e),
                  }))
                }
              ></CurrencyInput>

              <label className={s.label}>¿Maneja Coutas?</label>
              <select
                className={s.select}
                value={cuotas ? "true" : "false"}
                onChange={handleCuotas}
                disabled={form.anticipoID !== 0}
              >
                <option value={"true"}>Si</option>
                <option value={"false"}>No</option>
              </select>
            </div>
          </fieldset>
          {cuotas === true && (
            <div className={s.formGroupHorizontal4}>
              <label className={s.label}>Numero cuotas:</label>
              <input
                className={f.input}
                onChange={(e) => CrearAnticiposXCuotas(Number(e.target.value))}
              ></input>
            </div>
          )}
          {anticipos.map((a, index) => (
            <Field key={index} label={`Fecha cuota ${index + 1}`}>
              <DateInput
                width="50%"
                value={a.anticipoFecha}
                onValueChange={(fecha) => {
                  setAnticipos((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, anticipoFecha: fecha } : item,
                    ),
                  );
                }}
              />
              <CurrencyInput
                value={a.valorAnticipo}
                onChange={(valor) => {
                  setAnticipos((prev) =>
                    prev.map((item, i) =>
                      i === index
                        ? {
                            ...item,
                            valorAnticipo: valor,
                          }
                        : item,
                    ),
                  );
                }}
              />
            </Field>
          ))}

          <div className={s.buttonGroup} style={{ margin: "10px" }}>
            <button
              className={`${s.btn} ${s.btnPrimary}`}
              disabled={formState === "edicion"}
              onClick={handleCreate}
            >
              <BtonCrear />
            </button>
            <button
              className={`${s.btn} ${s.btnEdit}`}
              disabled={formState === "edicion"}
            >
              <BtnEdit />
            </button>
            <button
              className={`${s.btn} ${s.btnSuccess}`}
              disabled={formState === "lectura"}
              onClick={handleSave}
            >
              <BtnSave />
            </button>
            <button
              className={`${s.btn} ${s.btnCancel}`}
              disabled={formState === "lectura"}
              onClick={handleCancel}
            >
              <BtnCancel />
            </button>
            <button
              className={`${s.btn} ${s.btnDanger}`}
              disabled={formState === "edicion"}
            >
              <BtnEliminar />
            </button>
            <button
              className={`${s.btn} ${s.btnPrint}`}
              onClick={print}
              disabled={form.anticipoID === 0}
            >
              <BtnPrint />
            </button>
            <button
              className={`${s.btn} ${s.btnSearch}`}
              onClick={handleActiveSearch}
            >
              <BtnSearch />
            </button>
          </div>
        </div>
      </div>
      <div ref={contentRef}>
        <ReportDocument
          title="Comprobante Anticipo Proveedor"
          meta={[
            { label: "Proveedor", value: provedorSelected },
            { label: "Fecha Anticipo", value: form.anticipoFecha },
          ]}
          columns={ColumnasImpresion}
          data={anticipos.length > 0 ? anticipos : [form]}
          totals={[
            {
              label: "Valor Total",
              value:
                anticipos.length > 0
                  ? anticipos.reduce((act, i) => act + i.valorAnticipo, 0)
                  : form.valorAnticipo,
            },
          ]}
        ></ReportDocument>
      </div>
      <ConfirmDialog
        open={confirmPrint}
        title="Impresion de documentos"
        message="¿Desea Imprimir?"
        type="info"
        confirmText="Si"
        cancelText="No"
        onCancel={handleCancel}
        onConfirm={ConfirmarImpresion}
      />
      {search === true && (
        <div className={f.filterCard}>
          <div className={f.filterGrid}>
            <Field label="Proveedor">
              <AutoComplete
                placeHolder="Buscar proveedor por nombre..."
                onSelect={(e) =>
                  setBusqueda((prev) => ({
                    ...prev,
                    proveedorID: Number(e.tercerosID),
                  }))
                }
                onSearch={getproveedores}
                getKey={(p) => p.tercerosID}
                getLabel={(p) =>
                  `${p.tercerosIdentificacion} — ${p.tercerosNombres}`
                }
              ></AutoComplete>
            </Field>
            <Field label="Desde:">
              <DateInput
                width="200px"
                value={busqueda.fechaDesde}
                onValueChange={(fd) =>
                  setBusqueda((prev) => ({
                    ...prev,
                    fechaDesde: fd,
                  }))
                }
              />
            </Field>
            <Field label="Hasta:">
              <DateInput
                width="200px"
                value={busqueda.fechaHasta}
                onValueChange={(fh) =>
                  setBusqueda((prev) => ({
                    ...prev,
                    fechaHasta: fh,
                  }))
                }
              />
            </Field>
            <Field label="Tipo Anticipo:">
              <select
                className={s.select}
                value={busqueda.tipoAnticipo}
                onChange={(t) =>
                  setBusqueda((prev) => ({
                    ...prev,
                    tipoAnticipo: Number(t.target.value),
                  }))
                }
              >
                <option value={0}>Proveedor</option>
                <option value={1}>Transportador</option>
              </select>
            </Field>
            <Field label="Buscar">
              <button
                className={`${s.btn} ${s.btnPrimary}`}
                onClick={handleSearch}
              >
                <BtnSearch />
              </button>
            </Field>
          </div>
          <div className={s.list}>
            <div className={s.listHeader}>
              <h3>Listado de Registros</h3>
            </div>

            <div className={s.tableWrapper}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Detalle</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {ListadoAnticipos.map((d) => (
                    <tr key={d.anticipoID}>
                      <td>{d.anticipoFecha}</td>
                      <td>{d.anticipoDetalle}</td>
                      <td>{d.valorAnticipo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </PageBasic>
  );
}
