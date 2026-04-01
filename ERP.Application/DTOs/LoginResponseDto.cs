public class LoginResponseDTO
{
    public int UsuarioId { get; set; }
    public string NombreUsuario { get; set; } = null!;
    public int Rol { get; set; } 
    public string Token { get; set; } = null!;
}