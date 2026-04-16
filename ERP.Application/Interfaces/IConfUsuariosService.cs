using ERP.Application.DTOs;

namespace ERP.Application.Interfaces
{
    public interface IConfUsuarios
    {
        Task<IEnumerable<ConfUsuariosDTO>>GetAllAsync();
        Task<ConfUsuariosDTO?>GetByIdAsync(int id);
        Task<CreateConfUsuariosDTO>CreateUserAsync(CreateConfUsuariosDTO dto);
        Task<UpdateConfUsuariosDTO>UpdateUserAsync(int id,UpdateConfUsuariosDTO dto);
        Task deleteAsync(int id);
    }
}