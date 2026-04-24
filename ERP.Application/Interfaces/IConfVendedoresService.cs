using ERP.Application.DTOs;
using ERP.Domain.Entities;
using ERP.Domain.Interfaces;

namespace ERP.Application.Interfaces
{
    public interface IConfVendedoresServices
    {
        Task<IEnumerable<ConfVendedoresDTO>>GetALLAsync();
        Task<ConfVendedoresDTO?>GetByIdAsync(int id);
        Task<ConfVendedoresDTO>CreateAsync(CreateConfVendedoresDTO dto);
        Task<ConfVendedoresDTO>UpdateAsyc(int id,UpdateConfVendedoresDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}