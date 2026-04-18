using System.Dynamic;

namespace ERP.Domain.Interfaces
{
    public interface IConfEmpresaRepository
    {
        Task<IEnumerable<ConfEmpresa>>GetAllAsync();
        Task<ConfEmpresa?>GetByIDAsync(int id);
        Task<ConfEmpresa>CreateEmpresaAsync(ConfEmpresa datos);
        Task<ConfEmpresa>UpdateEmpresaAsync(ConfEmpresa datos);
    }
}
