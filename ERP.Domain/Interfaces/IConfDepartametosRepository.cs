using ERP.Domain.Entities;

namespace ERP.Domain.Interfaces
{
    public interface IConfDepartamentosRepository
    {
        Task<IEnumerable<ConfDepartamentos>>GetAllAsync();
        Task<IEnumerable<ConfDepartamentos?>>GetByNameAsync(string name);
        Task<ConfDepartamentos?>GetByCodigoAsync(string codigo);
        Task<ConfDepartamentos?>GetByIDAsync(int id);
        Task<ConfDepartamentos>CreateAsync(ConfDepartamentos depa);
        Task<ConfDepartamentos>UpdateAsync(ConfDepartamentos depa);
        Task<bool>DeleteAsync(int id);
    }
}