using ERP.Domain.Entities;

namespace ERP.Application.interfaces;

public interface IConfEmpresaService
{
    Task<IEnumerable<ConfEmpresa>>GetAllAsync();
    Task<ConfEmpresa?>GetByIdAsync(int id);
    Task<ConfEmpresa>CreateAsync(ConfEmpresa empresa);
    Task<ConfEmpresa?>UpdateAsync(ConfEmpresa empresa);
    Task<bool>DeleteAsync(int id);
}

