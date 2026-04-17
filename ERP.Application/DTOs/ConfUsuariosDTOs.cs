
namespace ERP.Application.DTOs
{
    public class ConfUsuariosDTO
    {
        public int UsuarioID{get;set;}
        public string UsuarioNombre{get; set;}=string.Empty;
        public string ContraseñaUsuario{get;set;}=string.Empty;
        public int UsuarioRol{get;set;}
    }

    public class CreateConfUsuariosDTO
    {
        public int UsuarioID{get;set;}
        public string UsuarioNombre{get; set;}=string.Empty;
        public string ContraseñaUsuario{get;set;}=string.Empty;
        public int  UsuarioRol{get;set;}
    }

    public class UpdateConfUsuariosDTO
    {
        public int UsuarioID{get;set;}
        public string UsuarioNombre{get; set;}=string.Empty;
        public string ContraseñaUsuario{get;set;}=string.Empty;
        public int UsuarioRol{get;set;}
    }

    public class DeleteConfUsuario
    {
        public int UsuarioID{get;set;}
    }

    public class LoginDto
    {
        public string UsuarioNombre {get;set;}=null!;
        public string ContraseñaUsuario{get;set;}=null!;
    }
}