namespace ERP.Domain.Interfaces
{
    public interface IBaseCrudRepository<TEntity , Tkey>
    {
        Task<IEnumerable<TEntity>>GetAllAsync();
        Task<TEntity?>GetByIDAsync(Tkey id);
        Task<TEntity>CreateAsync(TEntity entity);
        Task<TEntity>UpdateAsync(TEntity entity);
        Task<bool>DeleteAsync(Tkey id);
    }
}