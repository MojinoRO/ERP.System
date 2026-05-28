using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ERP.Domain.Entities
{
    public class ConfDepartamentos
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DepartamentoID{get;set;}

        [Required]
        public int PaisID {get;set;}
        
        public ConfPais ConfPais {get;set;} = null!;

        [Required]
        [MaxLength(2)]
        public string DepartamentoCodigo {get;set;}=string.Empty;

        [Required]
        [MaxLength(150)]
        public string DepartamentoNombre{get;set;}=string.Empty;

        [MaxLength(4)]
        public string? CodigoISO{get;set;}

        public ICollection<ConfCiudades>ConfCiudades = new List<ConfCiudades>();
    }
}