using System.Diagnostics;
using ERP.Domain.Entities;
using ERP.Domain.interfaces;
using ERP.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ERP.Infrastructure.Repositories;
public class ConfUsuariosRepository : IConfUsuariosRepository
{
    private readonly AppDbContext _Context;
    public ConfUsuariosRepository(AppDbContext context) => _Context=context;

    public async Task<IEnumerable<ConfUsuarios>> GetAllAsync()
    {
        return await _Context.ConfUsuarios.ToListAsync();
    }

    public async Task<ConfUsuarios?> GetByIdAsync(int id)
    {
        return await _Context.ConfUsuarios.FindAsync(id);
    }

    public async Task<ConfUsuarios>CreateAsync(ConfUsuarios user)
    {
        _Context.ConfUsuarios.Add(user);
        await _Context.SaveChangesAsync();
        return user;
    }

    public async Task<ConfUsuarios?>UpdateAsync(ConfUsuarios user)
    {
        var existe = await _Context.ConfUsuarios.FindAsync(user.UsuarioID);
        if(existe == null) return null;

        existe.NombreUsuario=user.NombreUsuario;
        existe.ContraseñaUsuario=user.ContraseñaUsuario;
        existe.RolUsuario=user.RolUsuario;

        await _Context.SaveChangesAsync();
        return existe;
    }

    public async Task<bool>DeleteAsync(int id)
    {
        var existe = await _Context.ConfUsuarios.FindAsync(id);
        if(existe == null)return false;

        _Context.ConfUsuarios.Remove(existe);
        await _Context.SaveChangesAsync();
        return true;
    }
}