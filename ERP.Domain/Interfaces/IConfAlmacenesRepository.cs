using ERP.Domain.Entities;
namespace ERP.Domain.Interfaces
{
    public interface IConfAlmacenesRepository
    {
        Task<IEnumerable<ConfAlmacenes>>GetAllAsync();
        Task<IEnumerable<ConfAlmacenes?>>GetByNameAsync(string Name);
        Task<ConfAlmacenes?>GetByCodigoAsync(string Codigo);
        Task<ConfAlmacenes?>GetByIDAsync(int id);
        Task<ConfAlmacenes>CrearAlmacenAsync(ConfAlmacenes almacen);
        Task<ConfAlmacenes>UpdateAlmacenAsync(ConfAlmacenes almacen);
        Task<bool>DeleteAsync(int ID);
    }
}