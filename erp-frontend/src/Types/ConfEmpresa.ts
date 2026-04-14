export interface CargaDatosEmpresaRequest{
  EmpresaID: number
  EmpresaNit:string,
  EmpresaDv:string,
  EmpresaNombre:string,
  EmpresaRazonSocial:string,
  EmpresaRepresentanteLegal:string,
  EmpresaTelefono:string,
  EmpresaDireccion:string,
  EmpresaEmail:string,
  EmpresaKeyLicencia: string
}

export interface CargaDatosEmpresaResponse{
  EmpresaID: number
  EmpresaNit:string,
  EmpresaDv:string,
  EmpresaNombre:string,
  EmpresaRazonSocial:string,
  EmpresaRepresentanteLegal:string,
  EmpresaTelefono:string,
  EmpresaDireccion:string,
  EmpresaEmail:string,
  EmpresaKeyLicencia: string
}