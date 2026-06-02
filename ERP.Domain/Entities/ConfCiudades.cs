using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ERP.Domain.Entities
{
    public class ConfCiudades
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CiudadID{get;set;}

        [Required]
        public int DepartamentoID{get;set;}
        
        [Required]
        [MaxLength(3)]
        public string CiudadCodigo{get;set;}=string.Empty;

        [Required]
        [MaxLength(150)]
        public string CiudadNombre{get;set;}=string.Empty;

        [MaxLength(5)]
        public string? CodigoDian{get;set;}=string.Empty;

        public ConfDepartamentos ConfDepartamento {get;set;}= null!;
        
    }
}