using ERP.Domain.Entities;
namespace ERP.Domain.Interfaces
{
    public interface IIntAnticiposRepository : IBaseCrudRepository<IntAnticipos , int >
    {
        Task<IEnumerable<IntAnticipos>>GetByFechasAsync(DateOnly desde , DateOnly hasta);
        Task<IEnumerable<IntAnticipos>>GetByFechaTerceroAsync(DateOnly desde , DateOnly hasta , int id, int Tipo);
    }
}