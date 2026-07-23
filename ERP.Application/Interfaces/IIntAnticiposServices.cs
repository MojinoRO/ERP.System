using ERP.Application.common;
using ERP.Application.DTOs;

namespace ERP.Application.Interfaces
{
    public interface IIntAnticiposServices : IBaseCrudServices<IntAnticiposDto, CreateIntAnticiposDto, UpdateIntAnticiposDto ,int>
    {
        Task<ServiceResponse<IEnumerable<IntAnticiposDto>>>GetByFechasAsync(DateOnly desde , DateOnly hasta);  
        Task<ServiceResponse<IEnumerable<IntAnticiposDto>>>GetByFechaTerceroAsync(DateOnly desde , DateOnly hasta , int id , int TipoAnticipo);
    }
}