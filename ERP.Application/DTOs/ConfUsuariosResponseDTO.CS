namespace ERP.Application.DTOs;
public class ConfUsuariosReponseDTO
{
    public int UsuarioID{get; set;}
    public string NombreUsuario { get; set;} = null!;
    public string ContraseñaUsuario {get; set;}= null!;
    public int RolUsuario {get; set;}
}