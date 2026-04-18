using ERP.Application.DTOs;
using ERP.Domain.Interfaces;
namespace ERP.Application.Interfaces
{
    public interface IConfEmpresaService
    {
        Task<IEnumerable<ConfEmpresaDTO>>GetAllAsync();
        Task<ConfEmpresaDTO?>GetByIdAsync(int id);
        Task<ConfEmpresaDTO>CreateEmpresaAsync(CreateConfEmpresaDto dto);
        Task<ConfEmpresaDTO>UpdateEmpresaAsync(int id,UpdateConfEmpresaDto dto);
    }
}