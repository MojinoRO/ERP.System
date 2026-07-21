using ERP.Application.DTOs;
using ERP.Application.common;

namespace ERP.Application.Interfaces
{
    public interface IIntLegalizacionTransportadoresService
    {
        Task<ServiceResponse<IEnumerable<IntLegalizacionTransportadoresDTO>>>getByFechaAsync(DateOnly desde , DateOnly hasta , int id);
        Task<ServiceResponse<IntLegalizacionTransportadoresDTO>>getByIdAsync(int id);
        Task<ServiceResponse<IntLegalizacionTransportadoresDTO>>createLegalizacionAsync(CreateIntLegalizacionTransportadoresDTO data);
        Task<ServiceResponse<IntLegalizacionTransportadoresDTO>>updateLegalizacionAsync(UpdateIntLegalizacionTransportadoresDTO data);
        Task<ServiceResponse<bool>>deleteLegalizacionAsync(int id);
    }
}