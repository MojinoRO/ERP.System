using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ERP.Domain.Entities
{
    public class ConfVendedores
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VendedorID{get;set;}

        [Required]
        [MaxLength(10)]
        public string CodigoVendedor{get ; set;}= null!;

        [Required]
        [MaxLength(15)]
        public string VendedorIdentificacion{get; set;}=null!;

        [Required]
        [MaxLength(150)]
        public string VendedorNombre{get;set;}=null!;

        [Required]
        public int VendedorEstado{get;set;}
    }
}