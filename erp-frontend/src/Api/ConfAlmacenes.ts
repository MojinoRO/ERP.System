import api from "../Api/AxiosConfig";
import { type ResponseAlmacenes } from "../Types/ConfAlmacenes";

export const ListarAlmacenesBD = async (): Promise<ResponseAlmacenes[]> => {
  try {
    const Almacenes = await api.get("/ConfAlmacenes");
    return Almacenes.data;
  } catch (error: any) {
    return error?.response.data;
  }
};

export const BuscadorAlmacen = async (
  nombre: string,
): Promise<ResponseAlmacenes[]> => {
  try {
    const Almacen = await api.get(`/ConfAlmacenes/nombre/${nombre}`);
    return Almacen.data;
  } catch (error: any) {
    return error?.response.data;
  }
};
