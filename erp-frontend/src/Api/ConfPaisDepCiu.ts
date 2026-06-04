import api from "../Api/AxiosConfig";
import { type ConfPaisResponse } from "../Types/ConfPaisDepCiu";

export const ListarPaises = async (): Promise<ConfPaisResponse[]> => {
  const Paises = await api.get("/ConfPais");
  return Paises.data.data;
};

export const BuscarPaisBD = async (
  data: string,
): Promise<ConfPaisResponse[]> => {
  const paises = await api.get(`/ConfPais/${data}`);
  return paises.data.data;
};
