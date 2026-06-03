import api from "../Api/AxiosConfig";
import { type ConfPaisResponse } from "../Types/ConfPaisDepCiu";

export const ListarPaises = async (): Promise<ConfPaisResponse[]> => {
  const Paises = await api.get("/ConfPais");
  return Paises.data.data;
};
