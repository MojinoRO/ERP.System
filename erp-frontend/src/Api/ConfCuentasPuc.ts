import api from "../Api/AxiosConfig";
import { type ConfCuentasPucResponse } from "../Types/ConfType";

export const ListarCuentasPuc = async (): Promise<ConfCuentasPucResponse[]> => {
  try {
    const data = await api.get("/ConfCuentasPuc");
    return data.data.data;
  } catch (error: any) {
    console.log(error.respose?.message);
    return [];
  }
};

export const BuscadorCuentasPuc = async (
  filtro: string,
): Promise<ConfCuentasPucResponse[]> => {
  try {
    const data = await api.get(`/ConfCuentasPuc/codigo/${filtro}`);
    console.log(data.data.data);
    return data.data.data;
  } catch (error: any) {
    console.log(error.respose?.message);
    return [];
  }
};

export const ValidarCodigo = async (codigo: string): Promise<boolean> => {
  try {
    const Existe = await api.get(`/ConfCuentasPuc/validate/${codigo}`);
    return Existe.status === 200 || Existe.status < 300;
  } catch (exception: any) {
    if (exception.response?.status === 400) return false;
    console.log(exception.response?.data);
    return false;
  }
};
