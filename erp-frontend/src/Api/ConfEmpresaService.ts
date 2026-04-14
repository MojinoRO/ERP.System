import type { CargaDatosEmpresaRequest, CargaDatosEmpresaResponse } from "../Types/ConfEmpresa";
import api from "./AxiosConfig"

export const GetDatosEmpresa = async (): Promise<CargaDatosEmpresaResponse> => {
  const resp = await api.get("/ConfEmpresa");

  const data = resp.data[0]; // 👈 sacas el primero

  return {
    EmpresaDv: data.empresaDv,
    Empresaid: data.empresa,
    EmpresaNit: data.empresaNit,
    EmpresaNombre: data.empresaNombre,
    EmpresaRazonSocial: "",
    EmpresaRepresentanteLegal: "",
    EmpresaTelefono: "",
    EmpresaDireccion: "",
    EmpresaEmail: "",
    EmpresaKeyLicencia: ""
  };
};

export const saveDatosEmpresa = async(data:CargaDatosEmpresaRequest) :Promise<void> =>{
  await api.post("/ConfEmpresa",data);
}

