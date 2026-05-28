using ERP.Domain.Entities;
namespace ERP.Domain.Interfaces
{
    public interface IConfCiudadesRepository
    {
        Task<IEnumerable<ConfCiudades>>GetAllAsync();
        Task<IEnumerable<ConfCiudades?>>GetByName(string name);
        Task<ConfCiudades?>GetByCodigoAsyc(string codigo);
        Task<ConfCiudades?>GetByIDAsync(int id);
        Task<ConfCiudades>CreateAsync(ConfCiudades ciudad);
        Task<ConfCiudades>UpdateAsync(ConfCiudades ciudad);
        Task<bool>DeleteAsync(int id);
    }
}