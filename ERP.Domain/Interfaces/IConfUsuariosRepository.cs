using ERP.Domain.Entities;

namespace ERP.Domain.interfaces;

public interface IConfUsuariosRepository
{
    Task<IEnumerable<ConfUsuarios>>GetAllAsync();
    Task<ConfUsuarios?>GetByIdAsync(int id);
    Task<ConfUsuarios?>GetByName(string username);
    Task<ConfUsuarios>CreateAsync(ConfUsuarios User);
    Task<ConfUsuarios?>UpdateAsync(ConfUsuarios user);
    Task<bool>DeleteAsync(int id);
}