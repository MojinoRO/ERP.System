using ERP.Application.DTOs;
namespace ERP.Application.Interfaces
{
    public interface IConfAlmacenesServices
    {
        Task<IEnumerable<ConfAlmacenDTO>>GetAllAsync();
        Task<IEnumerable<ConfAlmacenDTO?>>GetByNameAsync(string name);
        Task<ConfAlmacenDTO?>GetByIDAsync(int id);
        Task<ConfAlmacenDTO?>GetByCodigoAsync(string codigo);
        Task<ConfAlmacenDTO>CreateAlmacenAsync(CreateConfAlmacenDTO almacen);
        Task<ConfAlmacenDTO>UpdateAlmacenAsync(UpdateConfAlmacenDTO almacen);
        Task<bool>DeleteAsync(int id);
   }
}