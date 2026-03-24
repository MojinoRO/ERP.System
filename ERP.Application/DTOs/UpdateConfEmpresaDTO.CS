using System.ComponentModel.DataAnnotations;

namespace ERP.Application.DTOs;

public class UpdateConfEmpresaDTO
{
    [Required]
    public int EmpresaID {get;set;}

    [Required(ErrorMessage ="El nit es un campo obligatorio")]
    [MaxLength(15,ErrorMessage ="El nit no puede tener mas de 15 caracteres")]
    public string EmpresaNit {get; set;} =null!;

    [Required(ErrorMessage ="El Nombre Empresa es un campo obligatorio")]
    [MaxLength(150,ErrorMessage ="El Nombre no puede tener mas de 150 caracteres")]
    public string EmpresaNombre{get; set;}=null!;    
}
