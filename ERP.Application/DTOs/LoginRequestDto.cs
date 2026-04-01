using ERP.Domain.Entities;

namespace ERP.Application.DTOs;

public class loginRequestDTO
{
    public string NombreUsuario { get ; set;}= null!;
    public string ContraseñaUsuario{get ; set ;}=null!;
}
