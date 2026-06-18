using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ERP.Domain.Entities
{
    public class ConfCuentasPuc
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CuentasPucID {get;set;}

        
        [MaxLength(14)]
        public string CuentasucCodigo{get;set;}=string.Empty;

        [MaxLength(100)]
        [Required]
        public string CuentaPucNombre{get;set;}=string.Empty;

        [Column(TypeName ="nchar(1)")]
        [MaxLength(1)]
        [Required]
        public string CuentaPucNaturaleza{get;set;}=string.Empty;

        [Column(TypeName ="numeric(1,0)")]
        [MaxLength(1)]
        [Required]
        public int CuentaPucMovimiento{get;set;}

        [Column(TypeName ="numeric(1,0)")]
        [MaxLength(1)]
        [Required]
        public int CuentaPucTercero{get;set;}

        [Column(TypeName ="numeric(1,0)")]
        [MaxLength(1)]
        [Required]
        public int CuentaPucTipo{get;set;}
    }
}