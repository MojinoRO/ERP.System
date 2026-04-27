using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ERP.Domain.Entities
{
    public class ConfCategorias
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CategoriasID{get;set;}

        [Required]
        [MaxLength(4)]
        public string CategoriaCodigo{get;set;}=string.Empty;

        [Required]
        [MaxLength(150)]
        public string CategoriaNombre{get;set;}=string.Empty;

        [Required]
        public int ImpuestoACargo{get;set;}

        [Column(TypeName = "decimal(5,2)")]
        public decimal TarifaImpuesto { get; set; }

        [Required]
        public int Estado {get;set;}

    }
}