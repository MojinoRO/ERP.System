using ERP.Domain.Entities;

namespace ERP.Domain.Interfaces
{
    public interface IConfVendedoresRepository
    {
        Task<IEnumerable<ConfVendedores>>GetAllAsync();
        Task<ConfVendedores?>GetById(int id);
        Task<ConfVendedores>CreateAsync(ConfVendedores vendedorNew);
        Task<ConfVendedores>UPdateAsync(ConfVendedores UpdateVendedor);
        Task <bool>DeleteAsync(int id);
        Task<bool> ExisteAsync(int id);
        Task<ConfVendedores?>GetByCodigoAsync(string codigo);
    }
}