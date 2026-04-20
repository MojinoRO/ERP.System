using ERP.Application.DTOs;
using ERP.Domain.Entities;
using ERP.Domain.Interfaces;

namespace ERP.Application.Interfaces
{
    public interface IConfVendedoresServices
    {
        Task<IEnumerable<ConfVendedoresDTO>>GetALLAsync();
        Task<ConfVendedores?>GetByIdAsync(int id);
        Task<ConfVendedores>CreateAsync(CreateConfVendedoresDTO dto);
        Task<ConfVendedores>UpdateAsyc(int id,UpdateConfVendedoresDTO dto);
        Task DeleteAsync(int id);
    }
}