export interface ConfCuentasPucResponse {
  cuentasPucID: number;
  cuentasPucCodigo: string;
  cuentaPucNombre: string;
  cuentaPucNaturaleza: string;
  cuentaPucMovimiento: string;
  cuentaPucTercero: string;
  cuentaPucTipo: number;
}

export interface responseValidate {
  message: string;
  confirm: boolean;
}
