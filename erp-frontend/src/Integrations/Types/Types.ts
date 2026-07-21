export interface ZonasResponse {
  zonasID: number;
  zonasCodigo: string;
  zonasNombre: string;
}

export interface UbicacionesResponse {
  ubicacionID: number;
  ubicacionCodigo: string;
  ubicacionNombre: string;
}

export interface ArticulosResponse {
  articulosID: number;
  articulosCodigo: string;
  articulosNombre: string;
  articulosCosto: number;
}

export interface DocumentoResponse {
  documentosID: number;
  documentosCodigo: string;
  documentosNombre: string;
}

export interface ProveedoresXRuta {
  tercerosID: number;
  tercerosIdentificacion: string;
  tercerosNombres: string;
  tercerosCodigoAlterno: string;
  zonasID: number;
}
export interface Proveedores {
  tercerosID: number;
  tercerosIdentificacion: string;
  tercerosNombres: string;
  tercerosCelular: string;
  tercerosObservaciones: string;
}

export interface ListadoLegalizaciones {
  legalizacionID: number;
  fechaLegalizacion: string;
  terceroID: number;
  cantidadTotal: number;
  valorUnitario: number;
  valorTotal: number;
}
