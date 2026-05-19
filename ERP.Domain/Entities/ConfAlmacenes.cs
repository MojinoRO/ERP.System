using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ERP.Domain.Entities
{
    public class ConfAlmacenes
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AlmacenID {get;set;}
        
        [Required]
        [MaxLength(3)]
        public string AlmacenCodigo{get;set;}=string.Empty;

        [Required]
        [MaxLength(150)]
        public string AlmacenNombre{get;set;}=string.Empty;

        [Required]
        public int Estado {get;set;}
    }
}