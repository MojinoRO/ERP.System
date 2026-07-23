using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ERP.Domain.Entities
{
    public class IntAnticipos
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AnticipoID {get;set;}

        [Required]
        public int TerceroID {get;set;}

        [Required]
        public int AnticipoTipo {get;set;}

        [Required]
        [Column(TypeName ="date")]
        public DateOnly AnticipoFecha {get;set;}

        [Required]
        [Column(TypeName ="decimal")]
        public decimal ValorAnticipo {get;set;}

        [Required]
        public string AnticipoDetalle{get;set;}=string.Empty;

        [Column(TypeName ="int")]
        public int CuotasAnticipo{get;set;}
    }
}