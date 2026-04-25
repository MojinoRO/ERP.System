using System.Runtime.CompilerServices;
using ERP.Domain.Entities;

namespace ERP.Domain.Interfaces
{
    public interface IConfCatagoriasRepository
    {
        Task<IEnumerable<ConfCategorias>>getAllAsync();
        Task<ConfCategorias?>getByIDAsync(int id);
        Task<ConfCategorias?>getByCodigoAsync(string codigo);
        Task<ConfCategorias>CreateAsync(ConfCategorias categoria);
        Task<ConfCategorias>UpdateAsync(ConfCategorias categoria);
        Task<bool>DeleteAsync(int id);
    }
}