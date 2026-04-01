using ERP.Application.DTOs;

namespace ERP.Application.interfaces;

public interface IConfUsuariosService
{
    public Task<IEnumerable<ConfUsuariosReponseDTO>>GetAllAsync();
    public Task<ConfUsuariosReponseDTO?>GetByIdAsync(int id);
    public Task<ConfUsuariosReponseDTO>CreateAsync(CreateConfUsuariosDTO user);
    public Task<ConfUsuariosReponseDTO?>UpdateAsync(UpdateConfUsuariosDTO user);
    public Task<bool>DeleteAsync(int id);
    public Task<LoginResponseDTO?>LoginAsync(loginRequestDTO request);
}