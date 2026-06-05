export interface ConfPaisResponse {
  paisID: Number;
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
