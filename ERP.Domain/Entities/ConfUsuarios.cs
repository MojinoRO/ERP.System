using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
    [MaxLength(150)]
    public string EmpresaNombre{get;set;}=null!;
    
}