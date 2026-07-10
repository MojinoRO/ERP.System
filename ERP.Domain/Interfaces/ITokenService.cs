using System.Security.Claims;
using System.Text;

namespace ERP.Domain.Interfaces
{
    public interface ITokenService
    {
        string GeneratedToken(int UsuarioID, string   UsuarioNombre , int UsuarioRol);
    }
}