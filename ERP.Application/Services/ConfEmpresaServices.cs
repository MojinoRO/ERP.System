using ERP.Application.interfaces;
using ERP.Domain.interfaces;
using ERP.Domain.Entities;
using System.Runtime.CompilerServices;

namespace ERP.Application.Services;

public class ConfEmpresaService : IConfEmpresaService
{
    private readonly IConfEmpresaRepository _repository;
    // Recibe el repositorio inyectado — no sabe si es SQL Server o PostgreSQL
    public ConfEmpresaService (IConfEmpresaRepository repository) => _repository=repository;

    public async Task<IEnumerable<ConfEmpresa>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<ConfEmpresa?>GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<ConfEmpresa>CreateAsync(ConfEmpresa empresa)
    {
        //aqui pueden ir las reglas de negocio ejmplo que el nit sea real etc;
        return await _repository.CreateAsync(empresa);
    }

    public async Task<ConfEmpresa?>UpdateAsync(ConfEmpresa empresa)
    {
        return await _repository.UpdateAsync(empresa);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _repository.DeleteAsync(id);        
    }
}