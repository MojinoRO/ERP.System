using ERP.Application.common;
using ERP.Application.DTOs;

namespace ERP.Application.Interfaces
{
    public interface IConfCiudadesService
    {
        Task<ServiceResponse<IEnumerable<ConfCiudadesDTO>>>GetAllAsync();
        Task<ServiceResponse<IEnumerable<ConfCiudadesDTO?>>>GetByNameAsync(string name);
        Task<ServiceResponse<ConfCiudadesDTO?>>GetByCodigoAsync(string codigo);
        Task<ServiceResponse<ConfCiudadesDTO?>>GetByIdAsync(int id);
        Task<ServiceResponse<ConfCiudadesDTO>>CreateAsync(CreateConfCiudadesDTO dto);
        Task<ServiceResponse<ConfCiudadesDTO>>UpdateAsync(UpdateConfCiudadesDTO dto);
        Task<ServiceResponse<bool>>DeleteAsync(int id);
    }
}