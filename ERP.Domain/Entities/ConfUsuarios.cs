using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices;
namespace ERP.Domain.Entities
{
    public class ConfUsuarios
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UsuarioID{get; set;} 

        [Required]
        [MaxLength(50)]
        public string NombreUsuario{get;set;}=null!;

        [Required]
        [MaxLength(100)]
        public string ContraseñaUsuario{get;set;}=null!;

        [Required]
        public string RolUsuario{get;set;}=string.Empty;
        
    }
}

