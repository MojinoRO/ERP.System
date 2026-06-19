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
