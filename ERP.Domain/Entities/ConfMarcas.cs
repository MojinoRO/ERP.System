using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ERP.Domain.Entities
{
    public class ConfMarcas
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MarcaID{get;set;}

        [Required]
        [MaxLength(3,ErrorMessage ="Codigo superior a 3 digitos")]
        public string CodigoMarca {get;set;}=string.Empty;

        [Required]
        [MaxLength(150,ErrorMessage ="Nombre Muy Largo")]
        public string MarcaNombre{get;set;}=string.Empty;

        [Required]
        public int Estado{get;set;}

    }
}