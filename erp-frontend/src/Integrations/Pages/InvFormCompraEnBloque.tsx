import { useEffect, useState } from "react";
import { BtnChange } from "../../Components/component";
import { ErrorAlert } from "../../Components/UI/ErrorAlert";
import {
  type UbicacionesResponse,
  type DocumentoResponse,
  type ArticulosResponse,
  type ProveedoresXRuta,
  type Proveedores,
} from "../Types/Types";
import s from "../../Pages/shared.module.css";
import {
  getUbicaciones,
  getArticulos,
  getDocumentos,
  getProveedoresXRuta,
  getproveedores,
} from "../Api/CompraEnBloque";

import { AutoComplete } from "../../Components/UI/AutoComplete";

export default function ConfFormCompraBloque() {
  const [alert, SetALert] = useState<{
    message: string;
    type: "error" | "success" | "warning";
  } | null>(null);
  const [ubicaciones, setUbicaciones] = useState<UbicacionesResponse[]>([]);
  const [documentoCompra, setDocumentoCompra] =
    useState<DocumentoResponse | null>(null);
  const [articulo, setArticulo] = useState<ArticulosResponse | null>(null);
  const [fechaSelected, setFechaSelected] = useState("");
  const [rutaSelected, setRutaSelected] = useState(0);
  const [proveedoresXRuta, setProveedoresXRuta] = useState<
    ProveedoresXRuta[] | null
  >([]);
  const [transportadorSelected, setTransportadorSelected] =
    useState<Proveedores | null>(null);

  useEffect(() => {
    const CargarDatos = async () => {
      try {
        const [ubicaciones, articuloCompra, documentoCompra] =
          await Promise.all([
            getUbicaciones(),
            getArticulos(),
            getDocumentos(),
          ]);
        setUbicaciones(ubicaciones);
        setArticulo(articuloCompra);
        setDocumentoCompra(documentoCompra);
      } catch (error) {
        console.error(error);
      }
    };
    CargarDatos();
  }, []);

  const HandleSearch = () => {
    console.log(articulo);
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
    if (transportadorSelected == null) {
      return SetALert({
        message: "Debe seleccionar trassportador",
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
      setProveedoresXRuta(data);
      console.log(data);
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };
  return (
    <div className={s.container}>
      <label className={s.pageTitle}>Registro de compra temporal</label>
      {alert && (
        <ErrorAlert
          message={alert.message}
          type={alert.type}
          autoClose={3000}
          onClose={() => SetALert(null)}
        />
      )}
      <div className={s.encabezadoForm}>
        <div className={s.formGroupHorizontal}>
          <label className={s.label}>Docto:</label>
          {documentoCompra && (
            <select className={s.select}>
              <option value={documentoCompra.documentosID}>
                {documentoCompra.documentosNombre}
              </option>
            </select>
          )}
        </div>
        <div className={s.formGroupHorizontal}>
          <label className={s.label}>Articulo:</label>
          {articulo && (
            <select className={s.select}>
              <option value={articulo.articulosID}>
                {articulo.articulosNombre}
              </option>
            </select>
          )}
        </div>
        <div className={s.formGroupHorizontal}>
          <label className={s.label}>Costo</label>
          <input
            className={s.input}
            value={articulo?.articulosCosto ?? ""}
            readOnly
          ></input>
        </div>
        <div className={s.formGroupHorizontal}>
          <label className={s.label}>Fecha:</label>
          <input
            type="date"
            className={s.inputDate}
            onChange={(e) => setFechaSelected(e.target.value)}
          ></input>
        </div>
        <div className={s.formGroupHorizontal}>
          <label>Ruta:</label>
          {ubicaciones && (
            <select
              className={s.select}
              onChange={(e) => setRutaSelected(Number(e.target.value))}
            >
              <option value={0}>Seleccione Rutas</option>
              {ubicaciones.map((e) => (
                <option key={e.ubicacionID} value={e.ubicacionID}>
                  {e.ubicacionNombre}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className={s.formGroupHorizontal}>
          <AutoComplete
            label="Transportador:"
            placeHolder="Buscar cliente por nombre..."
            onSearch={getproveedores}
            getLabel={(t) =>
              `${t.tercerosNombres} — ${t.tercerosIdentificacion}`
            }
            getKey={(t) => t.tercerosID}
            onSelect={(t) => setTransportadorSelected(t)}
          />
        </div>
        <button
          className={`${s.button} ${s.btnSuccess}`}
          onClick={HandleSearch}
        >
          <BtnChange />
        </button>
      </div>

      {/* --- TABLA DE DIGITACIÓN  --- */}
      <div className={s.tableContainer}>
        <table className={s.table}>
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
            {proveedoresXRuta?.map((d, i) => (
              <tr key={d.tercerosID}>
                <td>{i + 1}</td>
                <td>{documentoCompra?.documentosCodigo}</td>
                <td>{0}</td>
                <td>{fechaSelected?.toString()}</td>
                <td>{d.tercerosIdentificacion}</td>
                <td>{d.tercerosNombres}</td>
                <td>{transportadorSelected?.tercerosNombres}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
