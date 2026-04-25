using ERP.Application.DTOs;
using ERP.Domain.Entities;

namespace ERP.Application.Interfaces
{
    public interface IConfCategoriasServices
    {
        Task<IEnumerable<ConfCategoriasDto>>getAllAsync();
        Task<ConfCategoriasDto?>getByIdAsync(int id);
        Task<ConfCategoriasDto?>getByCodigoAsync(string codigo);
        Task<ConfCategoriasDto>CreateAsync(CreateConfCategorias categoria);
        Task<ConfCategoriasDto>UpdateAsync(UpdateConfCategoriasDto categoria);
        public Task<bool>DeleteAsync(int id);
    }
}