using ERP.Domain.Entities;

namespace ERP.Application.DTOs;

public static class ConfUsuarioMapper
{
    public static ConfUsuarios ToEntity(CreateConfUsuariosDTO dto)
    {
        return new ConfUsuarios
        {
            NombreUsuario=dto.UsuarioNombre,
            ContraseñaUsuario=dto.ContraseñaUsuario,
            RolUsuario=dto.RolUsuario
        };
    }

    public static ConfUsuarios ToEntity(UpdateConfUsuariosDTO dto)
    {
        return new ConfUsuarios
        {
            UsuarioID=dto.UsuarioID,
            NombreUsuario=dto.UsuarioNombre,
            ContraseñaUsuario=dto.ContraseñaUsuario,
            RolUsuario=dto.RolUsuario
        };
    }

    public static ConfUsuariosReponseDTO ToDto(ConfUsuarios entity)
    {
        return new ConfUsuariosReponseDTO
        {
            UsuarioID=entity.UsuarioID,
            NombreUsuario=entity.NombreUsuario,
            ContraseñaUsuario=entity.ContraseñaUsuario,
            RolUsuario=entity.RolUsuario,
        };
    }
}