import api from "./AxiosConfig";
import { type CategoriasResponse } from "../Types/ConfCategorias";

export const getAllCategorias = async (): Promise<CategoriasResponse[]> => {
  const categorias = await api.get("/ConfCategorias");
  const data = categorias.data;
  return data;
};

export const getByCodigo = async (codigo: string): Promise<boolean> => {
  try {
    const categoria = await api.get(`/ConfCategorias/codigo/${codigo}`);
    if (!categoria) return false;
    return categoria.status == 200 || categoria.status == 201;
  } catch (error: any) {
    console.log(error?.response?.data || error.message);
    return false;
  }
};

export const CreateCategoria = async (
  data: CategoriasResponse,
): Promise<boolean> => {
  try {
    const create = await api.post("/ConfCategorias", data);
    return create.status === 200 || create.status === 201;
  } catch (error: any) {
    console.log(error?.response?.data || error.message);
    return false;
  }
};

export const updateCategorias = async (
  data: CategoriasResponse,
): Promise<boolean> => {
  try {
    const update = await api.put(`/ConfCategorias/${data.categoriaID}`, data);
    return update.status === 200 || update.status === 201;
  } catch (error: any) {
    console.log(error?.response?.data || error.message);
    return false;
  }
};

export const deleteCategorias = async (
  data: CategoriasResponse,
): Promise<boolean> => {
  try {
    const deleteCategoria = await api.delete(
      `/ConfCategorias/${data.categoriaID}`,
    );
    return deleteCategoria.status >= 200 || deleteCategoria.status < 300;
  } catch (error: any) {
    console.log(error?.response?.data || error.message);
    return false;
  }
};
