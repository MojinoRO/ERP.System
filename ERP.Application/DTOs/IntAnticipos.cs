namespace ERP.Application.DTOs
{
    public class IntAnticiposDto
    {
        public int AnticipoID {get;set;}
        public int TerceroID {get;set;}
        public int AnticipoTipo {get;set;}
        public DateOnly AnticipoFecha {get;set;}
        public string AnticipoDetalle{get;set;}=string.Empty;
        public decimal ValorAnticipo {get;set;}
        public int CuotasAnticipo{get;set;}
    }
    public class CreateIntAnticiposDto
    {
        public int TerceroID {get;set;}
        public int AnticipoTipo {get;set;}
        public DateOnly AnticipoFecha {get;set;}
        public string AnticipoDetalle{get;set;}=string.Empty;
        public decimal ValorAnticipo {get;set;}
        public int CuotasAnticipo{get;set;}
    }
    public class UpdateIntAnticiposDto
    {
        public int TerceroID {get;set;}
        public int AnticipoTipo {get;set;}
        public DateOnly AnticipoFecha {get;set;}
        public string AnticipoDetalle{get;set;}=string.Empty;
        public decimal ValorAnticipo {get;set;}
        public int CuotasAnticipo{get;set;}
    }
}