using ERP.Domain.Entities;

namespace ERP.Domain.Interfaces
{
    public interface IConfUsuariosRepository
    {
        Task<IEnumerable<ConfUsuarios>>GetAllAsync();
        Task<ConfUsuarios?>GetByIdAsync(int id);
        Task<ConfUsuarios?>CreateAsync(ConfUsuarios UserNew);
        Task<ConfUsuarios>UpdateAsync(ConfUsuarios UserUpdate);
        Task DeleteAsync(int id);
        Task <bool> ExistUser(int id);
    }
}