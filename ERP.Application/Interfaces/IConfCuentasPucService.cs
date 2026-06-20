using ERP.Application.common;
using ERP.Application.DTOs;

namespace ERP.Application.Interfaces
{
    public interface IConfCuentasPucService
    {
        Task<ServiceResponse<IEnumerable<ConfCuentasPucDto>>>GetAllAsync();
        Task<ServiceResponse<IEnumerable<ConfCuentasPucDto>>>GetByCodigo(string codigo);
    }
}