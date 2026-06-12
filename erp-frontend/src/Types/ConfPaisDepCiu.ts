export interface ConfPaisResponse {
  paisID: number;
  codigoPais: string;
  nombrePais: string;
  codigoAlfa: string;
}

export interface ConfDepartamentosResponse {
  departamentoID: number;
  paisID: number;
  departamentoCodigo: string;
  departamentoNombre: string;
  codigoISO: string;
  paisNombre: string;
  paisCodigo: string;
}

export interface ConfCiudadesRespose {
  ciudadID: number;
  departamentoID: number;
  ciudadNombre: string;
  ciudadCodigo: string;
  codigoDian: string;
  departamentoCodigo: string;
  departamentoNombre: string;
}
