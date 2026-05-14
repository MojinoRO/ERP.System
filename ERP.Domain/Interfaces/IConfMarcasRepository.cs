using ERP.Domain.Entities;

namespace ERP.Domain.Interfaces
{
    public interface IConfMarcasRepository
    {
        Task<IEnumerable<ConfMarcas>>GetAllAsync();
        Task<IEnumerable<ConfMarcas?>>GetByNameAsync(string nombre);
        Task<ConfMarcas?>GetByIDAsync(int id);
        Task<ConfMarcas?>GetByCodigoAsync(string codigo);
        Task<ConfMarcas>CreateAsync(ConfMarcas marca);
        Task<ConfMarcas>UpdateAsync(ConfMarcas marca);
        Task<bool> DeleteAsync(int marcaid);
    }
}