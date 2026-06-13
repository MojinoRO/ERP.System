import api from "../Api/AxiosConfig";
import {
  type ConfPaisResponse,
  type ConfDepartamentosResponse,
  type ConfCiudadesRespose,
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

export const ValidarCodigoDepartamentoBD = async (
  codigo: string,
): Promise<boolean> => {
  try {
    const data = await api.get(`/ConfDepartamento/codigo/${codigo}`);
    return data.status === 200 || data.status < 300;
  } catch (error: any) {
    if (error.response?.status === 400) return false;
    console.log(error.response?.data);
    return false;
  }
};

export const CreateDepartamentos = async (
  data: ConfDepartamentosResponse,
): Promise<boolean> => {
  try {
    const create = await api.post("/ConfDepartamento", data);
    return create.status === 200 || create.status < 300;
  } catch (error: any) {
    if (error.response?.status === 400) return false;
    console.log(error.response?.data);
    return false;
  }
};

export const UpdateDepartamentos = async (
  data: ConfDepartamentosResponse,
): Promise<Boolean> => {
  try {
    const update = await api.put(
      `/ConfDepartamentos/${data.departamentoID}`,
      data,
    );
    return update.status === 200 || update.status < 300;
  } catch (error: any) {
    if (error.response === 400) return false;
    console.log(error.response?.data);
    return false;
  }
};

export const DeleteDepartamentos = async (id: number): Promise<boolean> => {
  try {
    const Borrar = await api.delete(`/ConfDepartamento/${id}`);
    return Borrar.status === 200 || Borrar.status < 300;
  } catch (error: any) {
    if (error.status === 400) return false;
    console.log(error.response?.data);
    return false;
  }
};

//ConfCiudades
export const ListarCiudadesBD = async (): Promise<ConfCiudadesRespose[]> => {
  try {
    const data = await api.get("/ConfCiudades");
    return data.data.data;
  } catch (error: any) {
    console.log(error.response?.data);
    return [];
  }
};

export const BuscadorCiudades = async (
  texto: string,
): Promise<ConfCiudadesRespose[]> => {
  try {
    const data = await api.get(`/ConfCiudades/${texto}`);
    return data.data.data;
  } catch (error: any) {
    console.log(error.response?.data);
    return [];
  }
};
export const ValidarCodigoCiudadBD = async (
  codigo: string,
): Promise<boolean> => {
  try {
    const data = await api.get(`/ConfDepartamento/codigo/${codigo}`);
    return data.status === 200 || data.status < 300;
  } catch (error: any) {
    if (error.response?.status === 400) return false;
    console.log(error.response?.data);
    return false;
  }
};

export const CreateCiudad = async (
  data: ConfCiudadesRespose,
): Promise<boolean> => {
  try {
    const create = await api.post("/ConfDepartamento", data);
    return create.status === 200 || create.status < 300;
  } catch (error: any) {
    if (error.response?.status === 400) return false;
    console.log(error.response?.data);
    return false;
  }
};

export const UpdateCiudad = async (
  data: ConfCiudadesRespose,
): Promise<Boolean> => {
  try {
    const update = await api.put(
      `/ConfDepartamentos/${data.departamentoID}`,
      data,
    );
    return update.status === 200 || update.status < 300;
  } catch (error: any) {
    if (error.response === 400) return false;
    console.log(error.response?.data);
    return false;
  }
};

export const DeleteCiudad = async (id: number): Promise<boolean> => {
  try {
    const Borrar = await api.delete(`/ConfDepartamento/${id}`);
    return Borrar.status === 200 || Borrar.status < 300;
  } catch (error: any) {
    if (error.status === 400) return false;
    console.log(error.response?.data);
    return false;
  }
};
