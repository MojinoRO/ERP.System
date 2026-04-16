
namespace ERP.Application.DTOs
{
    public class ConfUsuariosDTO
    {
        public int UsuarioID{get;set;}
        public string UsuarioNombre{get; set;}=string.Empty;
        public string ContraseñaUsuario{get;set;}=string.Empty;
        public string UsuarioRol{get;set;}=string.Empty;
    }

    public class CreateConfUsuariosDTO
    {
        public int UsuarioID{get;set;}
        public string UsuarioNombre{get; set;}=string.Empty;
        public string ContraseñaUsuario{get;set;}=string.Empty;
        public string UsuarioRol{get;set;}=string.Empty;
    }

    public class UpdateConfUsuariosDTO
    {
        public int UsuarioID{get;set;}
        public string UsuarioNombre{get; set;}=string.Empty;
        public string ContraseñaUsuario{get;set;}=string.Empty;
        public string UsuarioRol{get;set;}=string.Empty;
    }

    public class DeleteConfUsuario
    {
        public int UsuarioID{get;set;}
    }
}