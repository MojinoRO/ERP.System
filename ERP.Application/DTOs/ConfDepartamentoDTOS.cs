using System.ComponentModel.DataAnnotations;

namespace ERP.Application.DTOs
{
    public class ConfDepartamentosDTO
    {
        public int DepartamentoID {get;set;}
        public int PaisID {get;set;}
        public string DepartamentoCodigo {get;set;}=string.Empty;
        public string DepartamentoNombre{get;set;}=string.Empty;
        public string CodigoISO{get;set;}=string.Empty;
        public string PaisNombre{get;set;}=string.Empty;
        public string PaisCodigo{get;set;}=string.Empty;

    }

    public class CreateConfDepartamentosDTO
    {
        [Required]
        public int PaisID {get;set;}
        [Required]
        [MaxLength(2,ErrorMessage ="Codigo debe ser de 2 digitos")]
        public string DepartamentoCodigo {get;set;}=string.Empty;
        [Required]
        [MaxLength(150,ErrorMessage ="Nombre muy largo")]
        public string DepartamentoNombre{get;set;}=string.Empty;

        [MaxLength(4,ErrorMessage ="Codigo debe ser de 4 digitos")]
        public string? CodigoISO{get;set;}
    }

    public class UpdateConfDepartamentosDTO
    {
        [Required]
        public int DepartamentoID{get;set;}

        [Required]
        public int PaisID {get;set;}

        [Required]
        [MaxLength(2,ErrorMessage ="Codigo debe ser de 2 digitos")]
        public string DepartamentoCodigo {get;set;}=string.Empty;
        
        [Required]
        [MaxLength(150,ErrorMessage ="Nombre muy largo")]
        public string DepartamentoNombre{get;set;}=string.Empty;

        [MaxLength(4,ErrorMessage ="Codigo debe ser de 4 digitos")]
        public string? CodigoISO{get;set;}
    }
}