using ERP.Application.common;
using ERP.Application.DTOs;

namespace ERP.Application.Interfaces
{
    public interface IConfCuentasPucService
    {
        Task<ServiceResponse<IEnumerable<ConfCuentasPucDto>>>GetAllAsync();
        Task<ServiceResponse<IEnumerable<ConfCuentasPucDto?>>>GetByCodigo(string codigo);
        Task<ServiceResponse<ConfCuentasPucDto?>>GetCallCode(string codigo);
        Task<ServiceResponse<ConfCuentasPucDto?>>GetByIdAsync(int id);
        Task<ServiceResponse<bool>>ValidateCodigoAsync(string codigo);
        Task<ServiceResponse<ConfCuentasPucDto>>UpdateMovimientoTercero(UpdateMovTerceroCuentaPuc dto);
        Task<ServiceResponse<ConfCuentasPucDto>>UpdateGeneralAsync(UpdateConfCuentasPucDto dto);
        Task<ServiceResponse<ConfCuentasPucDto>>CreateAsync(CreateConfCuentasPucDto dto);
        Task<ServiceResponse<bool>>DeleteAsync(int id);
    }
}