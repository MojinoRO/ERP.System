using ERP.Domain.Entities;
using ERP.Domain.interfaces;
using ERP.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
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

}