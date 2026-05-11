import api from "../Api/AxiosConfig";
import { type SubCategoriasResponse } from "../Types/ConfSubCategorias";

export const GetAllSubCategorias = async (): Promise<
  SubCategoriasResponse[]
> => {
  const subcategorias = await api.get("/ConfSubCategorias");
  const data = subcategorias.data;
  return data;
};
