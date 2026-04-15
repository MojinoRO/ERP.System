import type { CargaDatosEmpresaRequest, CargaDatosEmpresaResponse } from "../Types/ConfEmpresa";
import api from "./AxiosConfig"

export const GetDatosEmpresa = async (): Promise<CargaDatosEmpresaResponse> => {
  const resp = await api.get("/ConfEmpresa");

  const data = resp.data[0]; //  sacas el primero
  console.log(data)
  return {
    EmpresaID: data.empresaID,
    EmpresaNit: data.empresaNit,
    EmpresaDv: data.empresaDV,
    EmpresaNombre: data.empresaNombre,
    EmpresaRazonSocial:data.empresaRazonSocial,
    EmpresaRepresentanteLegal: data.empresaRepresentanteLegal,
    EmpresaTelefono: data.empresaTelefono,
    EmpresaDireccion: data.empresaDireccion,
    EmpresaEmail: data.empresaEmail,
    EmpresaKeyLicencia:data.empresaKeyLicencia
  };
};

export const saveDatosEmpresa = async(data:CargaDatosEmpresaRequest) :Promise<void> =>{
  await api.post(`/ConfEmpresa/${data.EmpresaID}`,data);
}