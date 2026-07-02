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
    const cuenta = data.data;

    const tienesubcuentas = 
  } catch (error: any) {
    console.log(error.response?.message);
    return { message: "Error al validar Cuenta", confirm: false };
  }
};
