import api from "../../Api/AxiosConfig";
import { type AnticiposResponse } from "../Types/Types";

export const CreateAnticipos = async (data: unknown): Promise<boolean> => {
  try {
    const created = await api.post("/IntAnticipos", data);
    return created.status === 200 || created.status < 300;
  } catch (error: any) {
    console.log(error.response?.message);
    return false;
  }
};

export const UpdateAnticipos = async (
  data: AnticiposResponse,
): Promise<boolean> => {
  try {
    const updated = await api.put(`/IntAnticipos/id/${data.anticipoID}`, data);
    return updated.status === 200 || updated.status < 300;
  } catch (error: any) {
    console.log(error.response?.message);
    return false;
  }
};

interface AnticiposSearch {
  proveedorID: number;
  fechaDesde: string;
  fechaHasta: string;
  tipoAnticipo: number;
}

export const GetListAnticiposProveedores = async (
  data: AnticiposSearch,
): Promise<AnticiposResponse[]> => {
  try {
    const { fechaDesde, fechaHasta, proveedorID, tipoAnticipo } = data;
    const response = await api.get(`/IntAnticipos/fechas`, {
      params: {
        fechaDesde,
        fechaHasta,
        proveedorID,
        tipoAnticipo,
      },
    });
    return response.data.data;
  } catch (error: any) {
    console.log(error.response?.data);
    return [];
  }
};

export const deleteAnticipos = async (anticipoID: number): Promise<boolean> => {
  try {
    const deleted = await api.delete(`/IntAnticipos/id/${anticipoID}`);
    return deleted.status === 200 || deleted.status < 300;
  } catch (error: any) {
    console.log(error.response?.data);
    return false;
  }
};
