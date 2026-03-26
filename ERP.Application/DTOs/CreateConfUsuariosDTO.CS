using System.ComponentModel.DataAnnotations;
using ERP.Domain.Entities;
namespace ERP.Application.DTOs;

public class CreateConfUsuariosDTO
{
    [Required(ErrorMessage ="El nombre del usuarios es obligatorio")]
    [MaxLength(50, ErrorMessage ="El nombre del usuario no puede mayor a 50 Caracteres")]
    public string UsuarioNombre {get; set;}=null!;

    [Required(ErrorMessage ="El nombre del usuarios es obligatorio")]
    [MaxLength(100, ErrorMessage ="Contraseña Invalidad")]
    public string ContraseñaUsuario{get;set;}= null!;

    [Required(ErrorMessage ="Debe seleccionar rol del empleado")]
    public int RolUsuario {get;set;}
}