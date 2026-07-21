using System.ComponentModel.DataAnnotations;

namespace ERP.Application.DTOs
{
    public class IntLegalizacionTransportadoresDTO
    {
        public int LegalizacionID {get;set;}
        public DateOnly FechaLegalizacion{get;set;}
        public int TerceroID{get;set;}
        public decimal CantidadTotal {get;set;}
        public decimal ValorUnitario {get;set;}
        public decimal ValorTotal{get;set;}
    }

    public class CreateIntLegalizacionTransportadoresDTO
    {
        [Required]
        public DateOnly FechaLegalizacion{get;set;}

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
        public DateOnly FechaLegalizacion{get;set;}

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