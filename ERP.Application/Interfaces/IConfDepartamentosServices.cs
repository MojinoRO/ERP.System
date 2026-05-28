using ERP.Application.common;
using ERP.Application.DTOs;
using ERP.Domain.Entities;
namespace ERP.Application.Interfaces
{
    public interface IConfDepartamentoService
    {
        Task<ServiceResponse<IEnumerable<ConfDepartamentosDTO>>>GetAllAsync();
        Task<ServiceResponse<IEnumerable<ConfDepartamentosDTO?>>>GetByNameAsync(string name);
        Task<ServiceResponse<ConfDepartamentosDTO?>>GetByIDAsync(int id);
        Task<ServiceResponse<ConfDepartamentosDTO?>>GetByCodigoAsync(string codigo);
        Task<ServiceResponse<ConfDepartamentosDTO>>CreateAsync(CreateConfDepartamentosDTO depa);
        Task<ServiceResponse<ConfDepartamentosDTO>>UpdateAsync(UpdateConfDepartamentosDTO depa);
        Task<ServiceResponse<bool>>DeleteAsync(int id);
    }
}