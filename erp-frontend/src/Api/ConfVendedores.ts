import api from "../Api/AxiosConfig";
import type { responseVendedores } from "../Types/ConfVendedores";

export const GetVendedores = async (): Promise<responseVendedores[]> => {
  const response = await api.get("/ConfVendedores");
  const data = response.data;
  return data;
};

export const GetVendedoresByID = async (
  id: number,
): Promise<responseVendedores | null> => {
  try {
    const response = await api.get(`/ConfVendedores/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
