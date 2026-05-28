using ERP.Application.common;
using ERP.Application.DTOs;

namespace ERP.Application.Interfaces
{
    public interface IConfCiudadesService
    {
        Task<ServiceResponse<IEnumerable<ConfCiudadesDTO>>>GetAllAsync();
        Task<ServiceResponse<IEnumerable<ConfCiudadesDTO>>>GetByName(string name);
    }
}