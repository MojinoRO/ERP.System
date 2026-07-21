using ERP.Application.common;
using ERP.Application.DTOs;
namespace ERP.Application.Interfaces
{
    public interface IBaseCrudServices<TDto ,TCreateDto , TUpdateDto , TKey>
    {
        Task<ServiceResponse<IEnumerable<TDto>>>GetAllAsync();
        Task<ServiceResponse<TDto>>GetByIdAsync(TKey id);
        Task<ServiceResponse<TDto>>CreateAsync(TCreateDto dto);
        Task<ServiceResponse<TDto>>UpdateAsync(TKey id, TUpdateDto data);
        Task<ServiceResponse<bool>>DeleteAsync(TKey id);

    }
}