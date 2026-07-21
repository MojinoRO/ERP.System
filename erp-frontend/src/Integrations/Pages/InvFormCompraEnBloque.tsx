import { useEffect, useState } from "react";
import {
  BtnChange,
  BtnEliminar,
  BtnSave,
  BtnNotepad,
} from "../../Components/component";
import { ErrorAlert } from "../../Components/UI/ErrorAlert";
import { formatCurrency, parseCurrency } from "../../Helper/CurrencyHelper";
import { CurrencyInput } from "../../Components/UI/CurrencyInput ";
import {
  type UbicacionesResponse,
  type DocumentoResponse,
  type ArticulosResponse,
  type ProveedoresXRuta,
  type Proveedores,
  type ZonasResponse,
} from "../Types/Types";
import f from "../Pages/InvFormCompraEnBloque.module.css";
import {
  getZonas,
  getUbicaciones,
  getArticulos,
  getDocumentos,
  getProveedoresXRuta,
  getproveedores,
  guardarCompraBloque,
} from "../Api/CompraEnBloque";
import { CreatelegalizacionTransportadores } from "../../Api/IntLegalizacionProveedor";
import { AutoComplete } from "../../Components/UI/AutoComplete";
import { ConfirmDialog } from "../../Components/UI/ConfirmDialog";

export default function ConfFormCompraBloque() {
  interface FilaCompra extends ProveedoresXRuta {
    Cantidad: number;
    Costo: number;
    Fecha: string;
    ArticuloID: number;
    TransportadorID: number;
    UbicacionID: number;
    DocumentosID: Number;
    Automatica: string;
    Numero: number;
    CompraID: number | null;
    Porcentaje: number;
  }

  const [filasCompras, SetFilasCompras] = useState<FilaCompra[]>([]);
  const [alert, SetALert] = useState<{
    message: string;
    type: "error" | "success" | "warning";
  } | null>(null);
  const [zonas, setZonas] = useState<ZonasResponse[]>([]);
  const [ubicaciones, setUbicaciones] = useState<UbicacionesResponse[]>([]);
  const [documentoCompra, setDocumentoCompra] =
    useState<DocumentoResponse | null>(null);
  const [articulo, setArticulo] = useState<ArticulosResponse | null>(null);
  const Porcentajefng = 0.75;
  const [fechaSelected, setFechaSelected] = useState("");
  const [ubicacioneSelected, setUbicacionesSelected] = useState(0);
  const [rutaSelected, setRutaSelected] = useState(0);
  const [transportadorSelected, setTransportadorSelected] =
    useState<Proveedores | null>(null);
  const [liquidacionRuta, setLiquidacionRuta] = useState(0);
  const [confirmLegalizacion, setconfirmLegalizacion] = useState(false);
  const [ValidateLegalizacion, setValidateLegalizacion] = useState(false);

  useEffect(() => {
    const CargarDatos = async () => {
      try {
        const [zonas, articuloCompra, documentoCompra, ubicaciones] =
          await Promise.all([
            getZonas(),
            getArticulos(),
            getDocumentos(),
            getUbicaciones(),
          ]);
        setZonas(zonas);
        setArticulo(articuloCompra);
        setDocumentoCompra(documentoCompra);
        setUbicaciones(ubicaciones);
      } catch (error) {
        console.error(error);
      }
    };
    CargarDatos();
  }, []);

  const HandleSearch = () => {
    if (documentoCompra == null) {
      return SetALert({
        message: "Documento vacio",
        type: "error",
      });
    }

    if (articulo == null) {
      return SetALert({
        message: "Articulo vacio",
        type: "error",
      });
    }

    if (fechaSelected == "") {
      return SetALert({
        message: "Fecha vacia",
        type: "error",
      });
    }
    if (rutaSelected == 0) {
      return SetALert({
        message: "ruta vacia",
        type: "error",
      });
    }
    if (ubicacioneSelected == 0) {
      return SetALert({
        message: "Ubicación vacia",
        type: "error",
      });
    }
    if (transportadorSelected == null) {
      return SetALert({
        message: "Debe seleccionar trassportador",
        type: "error",
      });
    }
    if (liquidacionRuta === 0) {
      return SetALert({
        message: "Debe asignar valor a liquidar para esta ruta",
        type: "error",
      });
    }
    ChangedProveedoresXRuta();
  };

  const ChangedProveedoresXRuta = async () => {
    try {
      const data = await getProveedoresXRuta(rutaSelected);
      if (data == null) {
        SetALert({
          message: "No hay proveedores asigandos a esta ruta",
          type: "warning",
        });
      }
      SetFilasCompras(
        data.map((p) => ({
          ...p,
          Cantidad: 0,
          Costo: articulo?.articulosCosto ?? 0,
          Fecha: fechaSelected,
          ArticuloID: Number(articulo?.articulosID),
          TransportadorID: Number(transportadorSelected?.tercerosID),
          UbicacionID: ubicacioneSelected,
          DocumentosID: Number(documentoCompra?.documentosID),
          Automatica: "Automatica",
          Numero: 0,
          CompraID: null,
          Porcentaje: Porcentajefng,
        })),
      );
      console.log(filasCompras);
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const handleCantidadChanged = (terceroID: number, Cantidad: number) => {
    SetFilasCompras((prev) =>
      prev.map((f) => (f.tercerosID === terceroID ? { ...f, Cantidad } : f)),
    );
  };

  const handleQuitarFila = (terceroid: number) => {
    const nuevasfilas = filasCompras.filter((f) => f.tercerosID !== terceroid);
    SetFilasCompras(nuevasfilas);
  };

  const TotalGeneral = filasCompras.reduce(
    (acc, f) => acc + f.Cantidad * f.Costo,
    0,
  );

  const TotalTransportador = filasCompras.reduce(
    (acc, f) => acc + f.Cantidad * liquidacionRuta,
    0,
  );

  const TotalCantidades = filasCompras.reduce((acc, f) => acc + f.Cantidad, 0);

  const handleSave = async () => {
    if (!ValidateLegalizacion) {
      return SetALert({
        message: "No se puede guardar ruta sin legalizar proveedor",
        type: "error",
      });
    }
    const FilasVacias = filasCompras.filter((f) => f.Cantidad === 0);
    if (FilasVacias.length > 0) {
      return SetALert({
        message: "Hay proveedores sin cantidad en el registro de entrada ",
        type: "error",
      });
    }

    const payLoad = filasCompras.map((f) => ({
      fecha: f.Fecha,
      articulosID: f.ArticuloID,
      costo: f.Costo,
      cantidad: f.Cantidad,
      proveedorID: f.tercerosID,
      transportadorID: f.TransportadorID,
      ubicacionID: f.UbicacionID,
      zonasID: f.zonasID,
      documentosID: f.DocumentosID,
      automatica: f.Automatica,
      numero: f.Numero,
      compraID: f.CompraID,
      porcentaje: f.Porcentaje,
    }));

    const ok = await guardarCompraBloque(payLoad);
    if (ok) {
      SetALert({ message: "Compra registrada correctamente", type: "success" });
      SetFilasCompras([]);
    } else {
      SetALert({ message: "Ocurrió un error al guardar", type: "error" });
    }
  };

  const handleLegalizar = () => {
    const FilasVacias = filasCompras.filter((f) => f.Cantidad === 0);
    if (FilasVacias.length > 0) {
      return SetALert({
        message: "Hay proveedores sin cantidad en el registro de entrada ",
        type: "error",
      });
    }
    setconfirmLegalizacion(true);
  };
  const ConfirmGuardarLiquidacionTrasnportador = async () => {
    try {
      const payLoad = {
        fechaLegalizacion: fechaSelected,
        terceroID: transportadorSelected?.tercerosID,
        cantidadtotal: filasCompras.reduce((act, f) => act + f.Cantidad, 0),
        valorUnitario: liquidacionRuta,
        valorTotal: filasCompras.reduce(
          (act, f) => act + f.Cantidad * liquidacionRuta,
          0,
        ),
      };
      const post = await CreatelegalizacionTransportadores(payLoad);
      if (post) {
        SetALert({
          message: "Legalización registrada correctamente",
          type: "success",
        });
        setValidateLegalizacion(true);
      } else {
        SetALert({ message: "Ocurrió un error al guardar", type: "error" });
      }
      setconfirmLegalizacion(false);
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className={f.page}>
      <div className={f.header}>
        <h1 className={f.title}>Registro de compra temporal</h1>
        <p className={f.subtitle}>Compra en bloque por ruta y transportador</p>
      </div>

      {alert && (
        <ErrorAlert
          message={alert.message}
          type={alert.type}
          autoClose={3000}
          onClose={() => SetALert(null)}
        />
      )}

      <div className={f.filterCard}>
        <div className={f.filterGrid}>
          <div className={f.field}>
            <label className={f.fieldLabel}>Documento</label>
            {documentoCompra && (
              <select className={f.select}>
                <option value={documentoCompra.documentosID}>
                  {documentoCompra.documentosNombre}
                </option>
              </select>
            )}
          </div>

          <div className={f.field}>
            <label className={f.fieldLabel}>Artículo</label>
            {articulo && (
              <select className={f.select}>
                <option value={articulo.articulosID}>
                  {articulo.articulosNombre}
                </option>
              </select>
            )}
          </div>

          <div className={f.field}>
            <label className={f.fieldLabel}>Costo:</label>
            <CurrencyInput
              value={articulo?.articulosCosto ?? 0}
              onChange={(val) =>
                setArticulo((prev) =>
                  prev ? { ...prev, articulosCosto: val } : prev,
                )
              }
            />
          </div>

          <div className={f.field}>
            <label className={f.fieldLabel}>Fecha</label>
            <input
              type="date"
              className={f.control}
              onChange={(e) => setFechaSelected(e.target.value)}
            ></input>
          </div>

          <div className={f.field}>
            <label className={f.fieldLabel}>FNG</label>
            <input value={Porcentajefng} className={f.control} readOnly></input>
          </div>

          <div className={f.field}>
            <label className={f.fieldLabel}>Ruta</label>
            {zonas && (
              <select
                className={f.select}
                onChange={(e) => setRutaSelected(Number(e.target.value))}
              >
                <option value={0}>Seleccione Rutas</option>
                {zonas.map((e) => (
                  <option key={e.zonasID} value={e.zonasID}>
                    {e.zonasNombre}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className={f.field}>
            <label className={f.fieldLabel}>Ubicación</label>
            {ubicaciones && (
              <select
                className={f.select}
                onChange={(e) => setUbicacionesSelected(Number(e.target.value))}
              >
                <option value={0}>Seleccione Ubicación</option>
                {ubicaciones.map((e) => (
                  <option key={e.ubicacionID} value={e.ubicacionID}>
                    {e.ubicacionNombre}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className={`${f.field} ${f.fieldWide}`}>
            <AutoComplete
              label="Transportador"
              placeHolder="Buscar Transportador por nombre..."
              onSearch={getproveedores}
              getLabel={(t) =>
                `${t.tercerosIdentificacion} — ${t.tercerosNombres}`
              }
              getKey={(t) => t.tercerosID}
              onSelect={(t) => setTransportadorSelected(t)}
            />
          </div>

          <div className={`${f.field} ${f.fieldWide}`}>
            <label className={f.fieldLabel}>Valor Liquidacion Ruta</label>
            <CurrencyInput
              value={liquidacionRuta}
              onChange={setLiquidacionRuta}
            />
          </div>

          <div>
            <label className={f.fieldLabel}>Total Ruta Transportador</label>
            <CurrencyInput
              value={TotalTransportador}
              onChange={() => {}}
              readOnly
            />
          </div>

          <div>
            <button
              className={f.searchBtn}
              disabled={
                filasCompras.length === 0 || ValidateLegalizacion === true
              }
              onClick={handleLegalizar}
            >
              <BtnNotepad />
            </button>
          </div>
          <div className={f.actions}>
            <button
              className={f.searchBtn}
              onClick={HandleSearch}
              style={{ margin: "5px" }}
            >
              <BtnChange />
              Buscar
            </button>

            <button
              className={f.searchBtn}
              onClick={handleSave}
              disabled={filasCompras.length === 0}
              style={{ margin: "5px" }}
            >
              <BtnSave />
              Guardar
            </button>
          </div>
        </div>
      </div>

      {/* --- TABLA DE DIGITACIÓN  --- */}
      <div className={f.tableCard}>
        <div className={f.tableCardHeader}>
          <span className={f.tableCardTitle}>Detalle de proveedores</span>
          <span className={f.tableCardCount}>
            {filasCompras?.length ?? 0} registro(s)
          </span>
        </div>
        <div className={f.tableWrap}>
          <table className={f.table}>
            <thead>
              <tr>
                <th style={{ width: "20px" }}>Ítem</th>
                <th>Docto</th>
                <th>Numero</th>
                <th>Fecha</th>
                <th>Cc / Nit </th>
                <th>Proveedor</th>
                <th>Transportador</th>
                <th style={{ width: "100px" }}>Cantidad</th>
                <th style={{ width: "150px" }}>Precio Unit.</th>
                <th>Fng</th>
                <th style={{ width: "150px" }}>Total</th>
                <th style={{ width: "80px", textAlign: "center" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filasCompras?.map((d, i) => (
                <tr key={d.tercerosID}>
                  <td>{i + 1}</td>
                  <td>{documentoCompra?.documentosCodigo}</td>
                  <td>{0}</td>
                  <td>{fechaSelected?.toString()}</td>
                  <td>{d.tercerosIdentificacion}</td>
                  <td>{d.tercerosNombres}</td>
                  <td>{transportadorSelected?.tercerosNombres}</td>
                  <td>
                    <input
                      type="number"
                      className={f.control}
                      value={d.Cantidad}
                      onChange={(e) =>
                        handleCantidadChanged(
                          d.tercerosID,
                          Number(e.target.value),
                        )
                      }
                    ></input>
                  </td>
                  <td>{formatCurrency(d.Costo)}</td>
                  <td>{Porcentajefng}</td>
                  <td>{formatCurrency(d.Cantidad * d.Costo)}</td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      type="button"
                      onClick={() => handleQuitarFila(d.tercerosID)}
                    >
                      <BtnEliminar />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={7}
                  style={{ textAlign: "right", fontWeight: "bold" }}
                >
                  Total Cantidad
                </td>
                <td style={{ fontWeight: "bold" }}>
                  {TotalCantidades.toFixed(0)}
                </td>
                <td
                  colSpan={2}
                  style={{ textAlign: "right", fontWeight: "bold" }}
                >
                  Total general
                </td>
                <td style={{ fontWeight: "bold" }}>
                  {formatCurrency(TotalGeneral)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <ConfirmDialog
        open={confirmLegalizacion}
        title="Legalizar Ruta"
        message={`¿Estas seguro de guardar Ruta para ${transportadorSelected?.tercerosNombres}?`}
        confirmText="Aceptar"
        cancelText="Cancelar"
        onCancel={() => setconfirmLegalizacion(false)}
        onConfirm={ConfirmGuardarLiquidacionTrasnportador}
      />
    </div>
  );
}
