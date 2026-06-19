using System.Data.Common;
using System.Runtime.CompilerServices;
using ERP.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

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
    public DbSet<ConfMarcas>ConfMarcas{get; set;}
    public DbSet<ConfAlmacenes>ConfAlmacenes{get;set;}
    public DbSet<ConfPais>ConfPais{get;set;}
    public DbSet<ConfDepartamentos>ConfDepartamentos{get;set;}
    public DbSet<ConfCiudades>ConfCiudades{get;set;}
    public DbSet<ConfCuentasPuc>ConfCuentasPuc{get;set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ConfSubCategorias>()
            .HasOne(sc => sc.ConfCategorias) // SubCategoria tiene una Categoria
            .WithMany(c => c.SubCategorias) // Categoria tiene muchas SubCategorias
            .HasForeignKey(sc =>sc.CategoriaID)  // FK
            .OnDelete(DeleteBehavior.Restrict);  // opcional (borra hijas si borras padre)

        modelBuilder.Entity<ConfDepartamentos>()
            .HasOne(dp => dp.ConfPais)
            .WithMany(c =>c.Departamentos)
            .HasForeignKey(dp=>dp.PaisID)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<ConfCiudades>()
            .HasOne(cu => cu.ConfDepartamento)
            .WithMany(c => c.ConfCiudades)
            .HasForeignKey(sc =>sc.DepartamentoID)
            .OnDelete(DeleteBehavior.Restrict);
    }
}   
