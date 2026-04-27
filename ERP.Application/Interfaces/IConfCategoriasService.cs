using ERP.Application.DTOs;
using ERP.Domain.Entities;

namespace ERP.Application.Interfaces
{
    public interface IConfCategoriasServices
    {
        Task<IEnumerable<ConfCategoriasDto>>getAllAsync();
        Task<ConfCategoriasDto?>getByIdAsync(int id);
        Task<ConfCategoriasDto?>getByCodigoAsync(string codigo);
        Task<ConfCategoriasDto>CreateAsync(CreateConfCategoriasDto categoria);
        Task<ConfCategoriasDto>UpdateAsync(int id, UpdateConfCategoriasDto categoria);
        public Task<bool>DeleteAsync(int id);
    }
}