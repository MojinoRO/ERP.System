using Microsoft.EntityFrameworkCore;
 
namespace ERP.Infrastructure.Data;

public class AppDbContext : DbContext
{
       // El constructor recibe las opciones (cadena de conexión, proveedor, etc.)
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    // Aquí irán los DbSet de cada entidad. Por ahora vacío, los agregamos en el paso 2.
    // Ejemplo futuro: public DbSet<Empresa> Empresas { get; set; }
}
