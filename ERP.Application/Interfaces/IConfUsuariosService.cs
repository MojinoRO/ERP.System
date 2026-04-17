using ERP.Application.DTOs;

namespace ERP.Application.Interfaces
{
    public interface IConfUsuariosService
    {
        Task<IEnumerable<ConfUsuariosDTO>>GetAllAsync();
        Task<ConfUsuariosDTO?>GetByIdAsync(int id);
        Task<ConfUsuariosDTO>CreateUserAsync(CreateConfUsuariosDTO dto);
        Task<ConfUsuariosDTO>UpdateUserAsync(int id,UpdateConfUsuariosDTO dto);
        Task DeleteAsync(int id);
    }
}