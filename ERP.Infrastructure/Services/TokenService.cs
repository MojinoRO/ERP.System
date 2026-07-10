using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ERP.Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace ERP.Infrastructure.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configura;

        public TokenService(IConfiguration configura)=> _configura= configura;

        public string GeneratedToken(int UsuarioID, string UsuarioNombre , int UsuarioRol)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier,UsuarioID.ToString()),
                new Claim(ClaimTypes.Name,UsuarioNombre),
                new Claim(ClaimTypes.Role, UsuarioRol.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configura["Jwt:key"]!));
            var credential = new SigningCredentials(key,SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer:_configura["Jwt:Issuer"],
                audience:_configura["Jwt:Audience"],
                claims:claims,
                expires: DateTime.UtcNow.AddHours(8),
                signingCredentials: credential
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}