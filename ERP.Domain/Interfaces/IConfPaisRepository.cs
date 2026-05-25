using ERP.Domain.Entities;
namespace ERP.Domain.Interfaces
{
    public interface IConfPaisRepository
    {
        Task<IEnumerable<ConfPais>>GetAllAsync();
        Task<IEnumerable<ConfPais?>>GetByNameAsync(string name);
        Task<ConfPais?>GetByCodigoAsync(string codigo);
        Task<ConfPais>CreateAsync(ConfPais pais);
        Task<ConfPais>UpdateAsync(ConfPais pais);
        Task<bool>Delete(int id);
    }
}