using System.Data.Common;
using ERP.Domain.Entities;
using Microsoft.EntityFrameworkCore;
 
namespace ERP.Infrastructure.Data;

public class AppDbContext : DbContext
{
       // El constructor recibe las opciones (cadena de conexión, proveedor, etc.)
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    // Aquí irán los DbSet de cada entida
    public DbSet<ConfEmpresa>ConfEmpresa {get;set;}
    public DbSet<ConfUsuarios>ConfUsuarios{get;set;}
    public DbSet<ConfVendedores>ConfVendedores{get;set;}
    public DbSet<ConfCategorias>ConfCategorias{get;set;}
}
