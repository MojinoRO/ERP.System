using System.ComponentModel.DataAnnotations;

namespace ERP.Application.DTOs
{
    public class ConfCuentasPucDto
    {
        public int CuentasPucID {get;set;}
        public string CuentasPucCodigo{get;set;}=string.Empty;
        public string CuentaPucNombre{get;set;}=string.Empty;
        public string CuentaPucNaturaleza{get;set;}=string.Empty;
        public string CuentaPucMovimiento{get;set;}=string.Empty;
        public string CuentaPucTercero{get;set;}=string.Empty;
        public int CuentaPucTipo{get;set;}
    }

    public class CreateConfCuentasPucDto
    {
        [Required]
        [MaxLength(15,ErrorMessage ="Error codigo muy largo")]
        public string CuentasPucCodigo{get;set;}=string.Empty;
        
        [Required]
        [MaxLength(150,ErrorMessage ="Error Nombre muy largo")]
        public string CuentaPucNombre{get;set;}=string.Empty;

        [Required]
        [MaxLength(1)]
        public string CuentaPucNaturaleza{get;set;}=string.Empty;

        [Required]
        [MaxLength(1)]
        public string CuentaPucMovimiento{get;set;}=string.Empty;

        [Required]
        [MaxLength(1)]
        public string CuentaPucTercero{get;set;}=string.Empty;

        [Required]
        [MaxLength(1)]
        public int CuentaPucTipo{get;set;}
    }

    public class UpdateConfCuentasPucDto
    {
        [Required]
        public int CuentasPucID {get;set;}
        
        [Required]
        [MaxLength(15,ErrorMessage ="Error codigo muy largo")]
        public string CuentasPucCodigo{get;set;}=string.Empty;
        
        [Required]
        [MaxLength(150,ErrorMessage ="Error Nombre muy largo")]
        public string CuentaPucNombre{get;set;}=string.Empty;

        [Required]
        [MaxLength(1)]
        public string CuentaPucNaturaleza{get;set;}=string.Empty;

        [Required]
        [MaxLength(1)]
        public string CuentaPucMovimiento{get;set;}=string.Empty;

        [Required]
        [MaxLength(1)]
        public string CuentaPucTercero{get;set;}=string.Empty;

        [Required]
        [MaxLength(1)]
        public int CuentaPucTipo{get;set;}
    }
}