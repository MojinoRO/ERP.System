using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Contracts;

namespace ERP.Domain.Entities;
public class ConfEmpresa
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int EmpresaID{get;set;}

    [Required]
    [MaxLength(15)]
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