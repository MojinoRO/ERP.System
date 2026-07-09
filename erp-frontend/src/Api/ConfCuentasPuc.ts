import api from "../Api/AxiosConfig";
import { type ConfCuentasPucResponse } from "../Types/ConfType";

export const ListarCuentasPuc = async (): Promise<ConfCuentasPucResponse[]> => {
  try {
    const data = await api.get("/ConfCuentasPuc");
    return data.data.data;
  } catch (error: any) {
    console.log(error.response?.message);
    return [];
  }
};

export const BuscadorCuentasPuc = async (
  filtro: string,
): Promise<ConfCuentasPucResponse[]> => {
  try {
    const data = await api.get(`/ConfCuentasPuc/codigo/${filtro}`);
    return data.data.data;
  } catch (error: any) {
    console.log(error.response?.message);
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

export const LlamarIDCuentaMayor = async (codigo: string): Promise<number> => {
  try {
    if (!codigo.trim()) return 0;
    const CuentaPucID = await api.get(`/ConfCuentasPuc/callcode/${codigo}`);
    return CuentaPucID.data.data.cuentasPucID;
  } catch (error: any) {
    if (error.response?.status === 400) return 0;
    console.log(error.response?.data);
    return 0;
  }
};

export const UpdateMovimientoTerceroCuenta = async (
  id: number,
): Promise<boolean> => {
  try {
    const dataQuery = {
      cuentasPucID: id,
      cuentaPucMovimiento: 0,
      cuentaPucTercero: 0,
    };
    const updated = await api.put(
      `ConfCuentasPuc/actm&t/${dataQuery.cuentasPucID}`,
      dataQuery,
    );
    return updated.status === 200 || updated.status < 300;
  } catch (error: any) {
    if (error.response?.status === 400) return false;
    console.log(error.response?.data);
    return false;
  }
};

export const createCuentaPuc = async (
  data: ConfCuentasPucResponse,
): Promise<boolean> => {
  try {
    console.log(typeof data.cuentaPucMovimiento);
    console.log(typeof data.cuentaPucTercero);
    const create = await api.post(`/ConfCuentasPuc`, data);
    return create.status == 200 || create.status < 300;
  } catch (error: any) {
    if (error.response?.status === 400) return false;
    console.log(error.response?.message);
    return false;
  }
};

export const updateCuentasPuc = async (
  data: ConfCuentasPucResponse,
): Promise<boolean> => {
  try {
    const updated = await api.put(
      `/ConfCuentasPuc/actcuen/${data.cuentasPucID}`,
      data,
    );
    return updated.status === 200 || updated.status < 300;
  } catch (error: any) {
    if (error.response?.status === 400) return false;
    console.log(error.response?.message);
    return false;
  }
};

export const deleteCuentasPuc = async (id: number): Promise<boolean> => {
  try {
    const deleted = await api.delete(`/ConfCuentasPuc/del/${id}`);
    return deleted.status === 200 || deleted.status < 300;
  } catch (error: any) {
    if (error.response?.status === 400) return false;
    console.log(error.response?.message);
    return false;
  }
};
