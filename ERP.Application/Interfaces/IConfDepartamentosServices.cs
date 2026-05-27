using ERP.Application.common;
using ERP.Application.DTOs;
using ERP.Domain.Entities;
namespace ERP.Application.Interfaces
{
    public interface IConfDepartamentoService
    {
        Task<ServiceResponse<IEnumerable<ConfDepartamentosDTO>>>GetAllAsync();
        Task<ServiceResponse<IEnumerable<ConfDepartamentosDTO?>>>GetByName(string name);
        Task<ServiceResponse<ConfDepartamentosDTO?>>GetByIDAsync(int id);
        Task<ServiceResponse<ConfDepartamentos>>CreateAsync(CreateConfDepartamentosDTO depa);
        Task<ServiceResponse<ConfDepartamentos>>UpdateAsync(UpdateConfDepartamentosDTO depa);
        Task<ServiceResponse<bool>>DeleteAsync(int id);
    }
}