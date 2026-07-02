export interface ConfCuentasPucResponse {
  cuentasPucID: number;
  cuentasPucCodigo: string;
  cuentaPucNombre: string;
  cuentaPucNaturaleza: string;
  cuentaPucMovimiento: number;
  cuentaPucTercero: number;
  cuentaPucTipo: number;
}

interface responseValidate {
  message: string;
  confirm: boolean;
}
