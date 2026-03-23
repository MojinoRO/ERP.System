using System.Diagnostics.CodeAnalysis;
using System.Formats.Asn1;
using System.Reflection.Metadata.Ecma335;
using ERP.Domain.Entities;
using ERP.Domain.interfaces;
using ERP.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Microsoft.Identity.Client.Extensibility;

namespace ERP.Infrastructure.Repositories;

public class ConfEmpresaRepository : IConfEmpresaRepository
{
    private readonly AppDbContext _Context;

    public ConfEmpresaRepository(AppDbContext context) => _Context= context;

    //READ
    public async Task<IEnumerable<ConfEmpresa>> GetAllAsync()
    {
        return await _Context.ConfEmpresa.ToListAsync();
    }

    public async Task<ConfEmpresa?> GetByIdAsync( int id)
    {
        return await _Context.ConfEmpresa.FindAsync(id);
    }

    public async Task<ConfEmpresa>CreateAsync(ConfEmpresa empresa)
    {
        _Context.ConfEmpresa.Add(empresa);
        await _Context.SaveChangesAsync();
        return empresa;
    }

    public async Task<ConfEmpresa?>UpdateAsync(ConfEmpresa empresa)
    {
        var existe = await _Context.ConfEmpresa.FindAsync(empresa.EmpresaID);
        if(existe == null) return null;
        existe.EmpresaNit = empresa.EmpresaNit;
        existe.EmpresaNombre = empresa.EmpresaNombre;

        await _Context.SaveChangesAsync();
        return existe;
    }

    public async Task<bool>DeleteAsync(int id)
    {
        var existe = await _Context.ConfEmpresa.FindAsync(id);
        if(existe == null) return false;

        _Context.ConfEmpresa.Remove(existe);
        await _Context.SaveChangesAsync();
        return true;
    }
}