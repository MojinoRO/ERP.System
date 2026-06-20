using ERP.Domain.Entities;

namespace ERP.Domain.Interfaces
{
    public interface IConfCuentasPucRepository
    {
        Task<IEnumerable<ConfCuentasPuc>>GetAllAsync();
        Task<IEnumerable<ConfCuentasPuc>>GetByCodigo(string codigo);
    }
}