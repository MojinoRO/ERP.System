using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ERP.Domain.Entities
{
    public class IntLegalizacionTransportadores
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LegalizacionID{get;set;}
        
        [Column(TypeName ="date")]
        [Required]
        public DateOnly FechaLegalizacion{get;set;}

        [Column(TypeName ="decimal")]
        [Required]
        public int TerceroID {get;set;}

        [Column(TypeName ="Decimal")]
        [Required]
        public decimal CantidadTotal{get;set;}

        [Column(TypeName ="Decimal")]
        [Required]
        public decimal ValorUnitario{get;set;}

        [Column(TypeName ="Decimal")]
        public decimal ValorTotal{get;set;}
    }
}