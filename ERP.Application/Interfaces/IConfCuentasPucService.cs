using ERP.Application.common;
using ERP.Application.DTOs;

namespace ERP.Application.Interfaces
{
    public interface IConfCuentasPucService
    {
        Task<ServiceResponse<IEnumerable<ConfCuentasPucDto>>>GetAllAsync();
    }
}