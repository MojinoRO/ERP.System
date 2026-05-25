import { FaSleigh } from "react-icons/fa";
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

export const ValidateCodigoBD = async (codigo: string): Promise<Boolean> => {
  try {
    const CodigoOk = await api.get(`/ConfAlmacenes/${codigo}`);
    return CodigoOk.data;
  } catch (error: any) {
    console.log(error?.response.data);
    return false;
  }
};

export const CreateAlmacen = async (
  data: ResponseAlmacenes,
): Promise<boolean> => {
  if (data == null) return false;
  try {
    const AlmacenNew = await api.post("/ConfAlmacenes", data);
    return AlmacenNew.status === 200 || AlmacenNew.status < 300;
  } catch (error: any) {
    console.log(error?.response.data);
    return false;
  }
};

export const UpdateAlmacen = async (
  data: ResponseAlmacenes,
): Promise<boolean> => {
  if (data === null) return false;
  try {
    const update = await api.put(`/ConfAlmacenes/${data.almacenID}`, data);
    return update.status === 200 || update.status < 300;
  } catch (error: any) {
    console.log(error?.response.data);
    return false;
  }
};

export const DeleteAlmacen = async (AlmacenID: number): Promise<boolean> => {
  if (AlmacenID == 0) return false;
  try {
    const AlmacenEliminado = await api.delete(`/ConfAlmacenes/${AlmacenID}`);
    return AlmacenEliminado.status === 200 || AlmacenEliminado.status < 300;
  } catch (error: any) {
    console.log(error?.response.data);
    return false;
  }
};
