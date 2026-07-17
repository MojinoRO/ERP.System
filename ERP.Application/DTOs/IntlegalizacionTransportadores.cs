using System.ComponentModel.DataAnnotations;

namespace ERP.Application.DTOs
{
    public class IntLegalizacionTransportadoresDTO
    {
        public int LegalizacionID {get;set;}
        public DateTime FechaLegalizacion{get;set;}
        public int TerceroID{get;set;}

        public decimal CantidadTotal {get;set;}
        public decimal ValorUnitario {get;set;}
        public decimal ValorTotal{get;set;}
    }

    public class CreateIntLegalizacionTransportadoresDTO
    {
        [Required]
        public DateTime FechaLegalizacion{get;set;}

        [Required]
        public int TerceroID{get;set;}

        [Required]
        public decimal CantidadTotal {get;set;}

        [Required]
        public decimal ValorUnitario {get;set;}

        [Required]
        public decimal ValorTotal{get;set;}
    }

    public class UpdateIntLegalizacionTransportadoresDTO
    {
        [Required]
        public int LegalizacionID {get;set;}
        
        [Required]
        public DateTime FechaLegalizacion{get;set;}

        [Required]
        public int TerceroID{get;set;}

        [Required]
        public decimal CantidadTotal {get;set;}

        [Required]
        public decimal ValorUnitario {get;set;}
        
        [Required]
        public decimal ValorTotal{get;set;}
    }
}