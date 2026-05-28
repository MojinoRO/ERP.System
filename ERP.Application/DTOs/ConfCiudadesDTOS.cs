using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

namespace ERP.Application.DTOs
{
    public class ConfCiudadesDTO
    {
        public int CiudadID{get;set;}
        public int DepartamentoID{get;set;}
        public string CiudadNombre{get;set;}=string.Empty;
        public string CiudadCodigo{get;set;}=string.Empty;
        public string? CodigoDian{get;set;}
        public string DepartamentoCodigo{get;set;}=string.Empty;
        public string DepartamentoNombre{get;set;}=string.Empty;
    }

    public class CreateConfCiudadesDTO
    {
        [Required]
        public int DepartamentoID{get;set;}
        
        [Required]
        [MaxLength(3,ErrorMessage ="Codigo debe ser de 3 digitos")]
        public string CiudadCodigo{get;set;}=string.Empty;

        [Required]
        [MaxLength(150,ErrorMessage ="Nombre Muy Largo")]
        public string CiudadNombre{get;set;}=string.Empty;

        [Required]
        [MaxLength(5,ErrorMessage ="Codigo Debe ser menor a 5 digitos")]
        public string? CodigoDian {get;set;}

    }

        public class UpdateConfCiudadesDTO
    {
        [Required]
        public int DepartamentoID{get;set;}
        
        [Required]
        [MaxLength(3,ErrorMessage ="Codigo debe ser de 3 digitos")]
        public string CiudadCodigo{get;set;}=string.Empty;

        [Required]
        [MaxLength(150,ErrorMessage ="Nombre Muy Largo")]
        public string CiudadNombre{get;set;}=string.Empty;

        [Required]
        [MaxLength(5,ErrorMessage ="Codigo Debe ser menor a 5 digitos")]
        public string? CodigoDian {get;set;}

    }
}