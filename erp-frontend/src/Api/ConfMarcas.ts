import api from "../Api/AxiosConfig";
import { type responseMarcas } from "../Types/ConfMarcas";

export const ListarMarcas = async (): Promise<responseMarcas[]> => {
  const marcas = await api.get("/ConfMarcas");
  return marcas.data;
};

export const BuscadorMarcas = async (
  nombre: string,
): Promise<responseMarcas[]> => {
  try {
    const marcas = await api.get(`/ConfMarcas/nombre/${nombre}`);
    const data = marcas.data;
    return data;
  } catch (error: any) {
    console.log(error);
    return [];
  }
};
export const ValideCodigoBD = async (codigo: string): Promise<boolean> => {
  try {
    await api.get(`/ConfMarcas/codigo/${codigo}`);
    return true;
  } catch (error: any) {
    if (error.response?.status === 400) return false;
    console.log(error);
    return false;
  }
};

export const CreateMarcas = async (data: responseMarcas): Promise<boolean> => {
  try {
    const Crear = await api.post(`/ConfMarcas`, data);
    return Crear.status === 200 || Crear.status < 300;
  } catch (error: any) {
    console.log(error.response.data);
    return false;
  }
};

export const UpdateMarcas = async (data: responseMarcas): Promise<boolean> => {
  try {
    const update = await api.put(`/ConfMarcas/`, data);
    return update.status === 200 || update.status < 300;
  } catch (error: any) {
    console.log(error.response.data);
    return false;
  }
};

export const DeleteMarcas = async (id: number): Promise<boolean> => {
  try {
    const eliminar = await api.delete(`/ConfMarcas/id/${id}`);
    return eliminar.status === 200 || eliminar.status < 300;
  } catch (error: any) {
    console.log(error.response.data);
    return false;
  }
};
