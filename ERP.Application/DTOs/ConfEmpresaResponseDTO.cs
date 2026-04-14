namespace ERP.Application.DTOs;
public class ConfEmpresaResponseDTO
{
    public int EmpresaID {get; set;}
    public string EmpresaNit{get;set;}=null!;

    public string EmpresaDV{get;set;}=null!;

    public string EmpresaNombre{get;set;}=null!;
    public string EmpresaRazonSocial{get; set;}=null!;

    public string EmpresaRepresentanteLegal{get; set;}=null!;

    public string EmpresaTelefono{get; set;}=null!;

    public string EmpresaDireccion{get;set;}=null!;
    public string EmpresaEmail{get;set;}=null!;

    public string EmpresaKeyLicencia{get;set;}=null!;
}