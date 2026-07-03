import {
  type ConfCuentasPucResponse,
  type responseValidate,
} from "../Types/ConfType";

import api from "../Api/AxiosConfig";

export const validateCuentaPucForDelete = async (
  codigo: string,
): Promise<responseValidate> => {
  if (!codigo.trim()) return { message: "Parametro Invalido", confirm: false };
  try {
    const { data } = await api.get(`/ConfCuentasPuc/codigo/${codigo}`);
    const cuentas = data.data;
    const tieneAuxiliar = cuentas.some(
      (cuentas: ConfCuentasPucResponse) =>
        cuentas.cuentasPucCodigo.startsWith(codigo) &&
        cuentas.cuentasPucCodigo.length > codigo.length,
    );
    if (tieneAuxiliar) {
      return {
        confirm: false,
        message: "La cuenta tiene subcuentas asociadas.",
      };
    }
    return {
      confirm: true,
      message: "La cuenta puede eliminarse.",
    };
  } catch (error: any) {
    console.error(error);
    return {
      message: "Error al validar la cuenta.",
      confirm: false,
    };
  }
};
