using ERP.Domain.Entities;

namespace ERP.Domain.Interfaces
{
    public interface IConfCuentasPucRepository
    {
        Task<IEnumerable<ConfCuentasPuc>>GetAllAsync();
        Task<IEnumerable<ConfCuentasPuc?>>GetByCodigoAsync(string codigo);
        Task<ConfCuentasPuc?>GetCallCode(string codigo);
        Task<ConfCuentasPuc?>GetByIdAsync(int id);
        Task<bool>ValidateCodigoAsync(string codigo);
        Task<ConfCuentasPuc>UpdateMovimientoTercero(ConfCuentasPuc cuenta);
        Task<ConfCuentasPuc>UpdateGeneralAsync(ConfCuentasPuc cuenta);
        Task<ConfCuentasPuc>CreateConfCuentasPuc(ConfCuentasPuc cuenta);
        Task<bool>DeleteAsync(int id);
    }
}