using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace ERP.Domain.Entities
{
    public class ConfPais
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PaisID {get;set;}

        [MaxLength(4)]
        [Required]
        public string CodigoPais {get;set;}=string.Empty;

        [Required]
        [MaxLength(150)]
        public string NombrePais {get;set;}=string.Empty;

        [MaxLength(3)]
        public string CodigoAlfa{get;set;}=string.Empty;

    }
}