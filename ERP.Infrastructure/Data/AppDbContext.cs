using System.Data.Common;
using System.Runtime.CompilerServices;
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
    public DbSet<ConfSubCategorias>ConfSubCategorias{get; set;}


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ConfSubCategorias>()
            .HasOne(sc => sc.ConfCategorias) // SubCategoria tiene una Categoria
            .WithMany(c => c.SubCategorias) // Categoria tiene muchas SubCategorias
            .HasForeignKey(sc =>sc.CategoriaID)  // FK
            .OnDelete(DeleteBehavior.Cascade);  // opcional (borra hijas si borras padre)
    }
}   
