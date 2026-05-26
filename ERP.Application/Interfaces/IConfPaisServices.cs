using ERP.Application.DTOs;
using ERP.Application.common;

namespace ERP.Application.Interfaces
{
    public interface IConfPaisServices
    {
        Task<ServiceResponse<IEnumerable<ConfPaisDto>>>GetAllAsync();
        Task<ServiceResponse<IEnumerable<ConfPaisDto?>>>GetByName(string name);
        Task<ServiceResponse<ConfPaisDto?>>GetByIDAsync(int id);
        Task<ServiceResponse<ConfPaisDto?>>GetByCodigo(string codigo);
        Task<ServiceResponse<ConfPaisDto>>CreatePaisAsync(CreateConfPaisDtos pais);
        Task<ServiceResponse<ConfPaisDto>>UpdatePaisAsync(UpdateConfPaisDtos pais);
        Task<ServiceResponse<bool>>DeleteAsync(int id);
    }
    
    
}