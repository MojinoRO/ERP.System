import api from "../Api/AxiosConfig";
import {
  type ConfPaisResponse,
  type ConfDepartamentosResponse,
} from "../Types/ConfPaisDepCiu";

//PAISES
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

export const ValidaCodigoBD = async (codigo: string): Promise<Boolean> => {
  try {
    var pais = await api.get(`/ConfPais/codigo/${codigo}`);
    return pais.status == 200 || pais.status < 300;
  } catch (error: any) {
    if (error.response?.status === 400) return false;
    console.log(error);
    return false;
  }
};

export const CrearPais = async (data: ConfPaisResponse): Promise<Boolean> => {
  try {
    const Creado = await api.post("/ConfPais", data);
    return Creado.status === 200 || Creado.status < 300;
  } catch (error: any) {
    if (error.response?.status === 400) return false;
    console.log(error);
    return false;
  }
};

export const UpdatePais = async (data: ConfPaisResponse): Promise<boolean> => {
  try {
    const Update = await api.put(`/ConfPais/${data.paisID}`, data);
    return Update.status === 200 || Update.status < 300;
  } catch (error: any) {
    if (error.response?.status === 400) return false;
    console.log(error);
    return false;
  }
};

export const DeletePais = async (id: Number): Promise<boolean> => {
  try {
    const Update = await api.delete(`/ConfPais/${id}`);
    return Update.status === 200 || Update.status < 300;
  } catch (error: any) {
    if (error.response?.status === 400) return false;
    console.log(error);
    return false;
  }
};

/* DEPARTAMENTOS*/
export const ListarDepartamentos = async (): Promise<
  ConfDepartamentosResponse[]
> => {
  const lista = await api.get("/ConfDepartamento");
  return lista.data.data;
};

export const BuscarDepartamentoPorNombre = async (
  nombre: string,
): Promise<ConfDepartamentosResponse[]> => {
  const Lista = await api.get(`/ConfDepartamento/name/${nombre}`);
  return Lista.data.data;
};
