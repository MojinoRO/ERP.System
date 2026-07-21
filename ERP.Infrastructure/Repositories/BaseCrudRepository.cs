using ERP.Domain.Interfaces;
using ERP.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ERP.Infrastructure.Repositories
{
    public abstract class BaseCrudRepository<TEntity , Tkey> : IBaseCrudRepository<TEntity  , Tkey> where TEntity : class
    {
        protected readonly AppDbContext _context;
        protected readonly DbSet<TEntity> _dbSet;
        protected BaseCrudRepository(AppDbContext context)
        {
            _context=context;
            _dbSet=context.Set<TEntity>();
        }

        public virtual async Task<IEnumerable<TEntity>>GetAllAsync()
            => await _dbSet.AsNoTracking().ToListAsync();

        public virtual async Task<TEntity?>GetByIDAsync(Tkey id)
            => await _dbSet.FindAsync(id);

        public virtual async Task<TEntity>CreateAsync(TEntity entity)
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public virtual async  Task<TEntity>UpdateAsync(TEntity entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return entity;
        }

        public virtual async Task<bool>DeleteAsync(Tkey id)
        {
            var entity = await _dbSet.FindAsync(id);
            if(entity is null) return false;
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}