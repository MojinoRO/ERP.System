import api from "../../Api/AxiosConfig";
import {
  type UbicacionesResponse,
  type ArticulosResponse,
  type DocumentoResponse,
  type ProveedoresXRuta,
  type Proveedores,
  type ZonasResponse,
} from "../Types/Types";

export const getZonas = async (): Promise<ZonasResponse[]> => {
  try {
    const { data } = await api.get<ZonasResponse[]>("/Integrations/Zonas");
    return data;
  } catch (error: any) {
    console.error(error.response?.data ?? error);
    return [];
  }
};

export const getUbicaciones = async (): Promise<UbicacionesResponse[]> => {
  try {
    const { data } = await api.get<UbicacionesResponse[]>(
      "/Integrations/Ubicaciones",
    );
    return data;
  } catch (error: any) {
    console.error(error.response?.data ?? error);
    return [];
  }
};

export const getproveedores = async (text: string): Promise<Proveedores[]> => {
  try {
    const data = await api.get(`/Integrations/proveedores/${text}`);
    return data.data;
  } catch (error: any) {
    console.error(error.response?.data ?? error);
    return [];
  }
};

export const getArticulos = async (): Promise<ArticulosResponse | null> => {
  try {
    const { data } = await api.get<ArticulosResponse>(
      "/Integrations/Articulos",
    );
    return data;
  } catch (error: any) {
    console.error(error.response?.data ?? error);
    return null;
  }
};

export const getDocumentos = async (): Promise<DocumentoResponse | null> => {
  try {
    const { data } = await api.get<DocumentoResponse>(
      "/Integrations/Documentos",
    );
    return data;
  } catch (error: any) {
    console.error(error.response?.data ?? error);
    return null;
  }
};

export const getProveedoresXRuta = async (
  UbicacionID: number,
): Promise<ProveedoresXRuta[]> => {
  try {
    const data = await api.get(
      `/Integrations/ProveeedoresXRuta/${UbicacionID}`,
    );
    return data.data;
  } catch (error: any) {
    console.log(error.response?.data ?? error);
    return [];
  }
};

export const guardarCompraBloque = async (
  data: unknown[],
): Promise<boolean> => {
  try {
    await api.post("Integrations/GuardarCompraBloque", data);
    return true;
  } catch (error: any) {
    console.log(error.response?.data ?? error);
    return false;
  }
};
