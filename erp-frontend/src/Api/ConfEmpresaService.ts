import api from "../Api/AxiosConfig";
import type {
  ConfEmpresa,
  CreateConfEmpresa,
  UpdateConfEmpresa,
} from "../Types/ConfEmpresa";

//get obtener todas las empresas
export const getEmpresas = async (): Promise<ConfEmpresa[]> => {
  const reponse = await api.get<ConfEmpresa[]>("/ConfEmpresa");
  return reponse.data;
};
// get obtener por id
export const getEmpresaById = async (id: number): Promise<ConfEmpresa> => {
  const reponse = await api.get<ConfEmpresa>(`/ConfEmpresa/${id}`);
  return reponse.data;
};
// POST — crear una empresa
export const createEmpresa = async (
  empresa: CreateConfEmpresa,
): Promise<ConfEmpresa> => {
  const response = await api.post<ConfEmpresa>("/ConfEmpresa", empresa);
  return response.data;
};
//PUT -- Actualizar empresa
export const UpdateEmpresa = async (
  id: number,
  empresa: UpdateConfEmpresa,
): Promise<ConfEmpresa> => {
  const response = await api.put<ConfEmpresa>(`/ConfEmpresa/${id}`, empresa);
  return response.data;
};
export const DeleteEmpresa = async (id: number): Promise<void> => {
  await api.delete(`/ConfEmpresa/${id}`);
};
