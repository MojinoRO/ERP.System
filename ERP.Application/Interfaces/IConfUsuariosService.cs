using ERP.Application.DTOs;

namespace ERP.Application.interfaces;

public interface IConfUsuariosService
{
    public Task<IEnumerable<ConfUsuariosReponseDTO>>GetAllAsync();
    public Task<ConfUsuariosReponseDTO?>GetByIdAsync(int id);
    public Task<CreateConfUsuariosDTO>CreateAsync(CreateConfUsuariosDTO user);
    public Task<UpdateConfEmpresaDTO>UpdateAsync(UpdateConfUsuariosDTO user);
    public Task<bool> DeteleAsync(int id);

}