import api from "../Api/AxiosConfig";
import { type SubCategoriasResponse } from "../Types/ConfSubCategorias";

export const GetAllSubCategorias = async (): Promise<
  SubCategoriasResponse[]
> => {
  const subcategorias = await api.get("/ConfSubCategorias");
  const data = subcategorias.data;
  return data;
};

export const Validate = async (
  codigo: string,
  CategoriaID: number,
): Promise<boolean> => {
  try {
    await api.get(
      `/ConfSubCategorias/Codigo/${codigo}?CategoriaID=${CategoriaID}`,
    );
    return true;
  } catch (error: any) {
    if (error.response?.status === 400) {
      return false;
    }
    console.log(error);
    return false;
  }
};

export const deleteSubcategorias = async (id: number): Promise<boolean> => {
  try {
    const eliminar = await api.delete(`/ConfSubCategorias/id/${id}`);
    return eliminar.status >= 200 || eliminar.status < 300;
  } catch (error: any) {
    console.log(error.response.data);
    return false;
  }
};

export const CreateSubcategorias = async (
  data: SubCategoriasResponse,
): Promise<boolean> => {
  try {
    const crear = await api.post("/ConfSubCategorias", data);
    return crear.status === 200 || crear.status === 201;
  } catch (error: any) {
    console.log(error.response.data);
    return false;
  }
};

export const UpdateSubcategoria = async (
  data: SubCategoriasResponse,
): Promise<boolean> => {
  try {
    const update = await api.put(
      `/ConfSubCategorias/id/${data.subCategoriaID}`,
      data,
    );
    return update.status === 200 && update.status < 300;
  } catch (error: any) {
    console.log(error.response.data);
    return false;
  }
};
