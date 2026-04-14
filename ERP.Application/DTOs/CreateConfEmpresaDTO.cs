using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace ERP.Application.DTOs;

public class CreateConfEmpresaDTO
{
    public int EmpresaID{get; set;}

    [Required(ErrorMessage ="El nit es un campo obligatorio")]
    [MaxLength(15,ErrorMessage ="El nit no puede tener mas de 15 caracteres")]
    public string EmpresaNit{get;set;}=null!;

    [Required]
    [MaxLength(1)]
    public string EmpresaDV{get;set;}=null!;

    [Required]
    [MaxLength(150)]
    public string EmpresaNombre{get;set;}=null!;

    [Required]
    [MaxLength(150)]
    public string EmpresaRazonSocial{get; set;}=null!;

    [Required]
    [MaxLength(150)]
    public string EmpresaRepresentanteLegal{get; set;}=null!;

    [Required]
    [MaxLength(150)]
    public string EmpresaTelefono{get; set;}=null!;

    [Required]
    [MaxLength(150)]
    public string EmpresaDireccion{get;set;}=null!;

    [Required]
    [MaxLength(150)]
    public string EmpresaEmail{get;set;}=null!;

    [Required]
    [MaxLength(150)]
    public string EmpresaKeyLicencia{get;set;}=null!;
}
