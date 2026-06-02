using ERP.Domain.Entities;
using ERP.Domain.Interfaces;
using ERP.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ERP.Infrastructure.Repositories
{
    public class ConfDepartamentosRepository : IConfDepartamentosRepository
    {
        private readonly AppDbContext _context;
        public ConfDepartamentosRepository(AppDbContext context) => _context=context;
        
        public async Task<IEnumerable<ConfDepartamentos>> GetAllAsync()
        {
            return await _context.ConfDepartamentos.AsNoTracking().Include(d =>d.ConfPais).OrderBy(d=>d.DepartamentoCodigo).ToListAsync();
        }
        
        public async Task<IEnumerable<ConfDepartamentos?>>GetByNameAsync(string name)
        {
            return await _context.ConfDepartamentos.AsNoTracking().Include(d =>d.ConfPais)
            .Where(d=> EF.Functions.Like(d.DepartamentoNombre, $"%{name}%")).ToListAsync();
        } 

        public async Task<ConfDepartamentos?>GetByCodigoAsync(string codigo)
        {
            return await _context.ConfDepartamentos.AsNoTracking().Include(d =>d.ConfPais)
            .FirstOrDefaultAsync(d=>d.DepartamentoCodigo == codigo);
        }

        public async Task<ConfDepartamentos?>GetByIDAsync(int id)
        {
            return await _context.ConfDepartamentos.AsNoTracking().Include(d =>d.ConfPais)
            .FirstOrDefaultAsync(d=>d.DepartamentoID == id);
        }

        public async Task<ConfDepartamentos>CreateAsync(ConfDepartamentos dpto)
        {
            await _context.ConfDepartamentos.AddAsync(dpto);
            await _context.SaveChangesAsync();
            return dpto;
        }

        public async Task<ConfDepartamentos>UpdateAsync(ConfDepartamentos dpto)
        {
            _context.Entry(dpto).State =EntityState.Modified;
            await _context.SaveChangesAsync();
            return dpto;
        }
        public async Task<bool>DeleteAsync(int id)
        {
            var depto = await _context.ConfDepartamentos.FindAsync(id);
            if(depto == null) return false;
            _context.ConfDepartamentos.Remove(depto);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}