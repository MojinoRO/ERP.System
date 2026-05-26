using ERP.Infrastructure.Data;
using ERP.Domain.Entities;
using ERP.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;

namespace ERP.Infrastructure.Repositories
{
    public class ConfPaisRepository : IConfPaisRepository
    {
        private readonly AppDbContext _context;
        public ConfPaisRepository (AppDbContext context)=> _context = context;

        public async Task<IEnumerable<ConfPais>> GetAllAsync()
        {
            return await _context.ConfPais
            .AsNoTracking()
            .ToListAsync();
        }

        public async Task<ConfPais?>GetByCodigoAsync(string codigo)
        {
            return await _context.ConfPais
            .AsNoTracking()
            .FirstOrDefaultAsync(x=>x.CodigoPais == codigo);
        }

        public async Task<IEnumerable<ConfPais?>>GetByNameAsync(string name)
        {
            return await _context.ConfPais.AsNoTracking()
            .Where(x => EF.Functions.Like(x.NombrePais, $"%{name}%"))
            .ToListAsync();
        }
        
        public async Task<ConfPais?>GetByIDAsync(int id)
        {
            return await _context.ConfPais.AsNoTracking()
            .FirstOrDefaultAsync(x=>x.PaisID == id);
        }

        public async Task<ConfPais>CreateAsync(ConfPais pais)
        {
            await _context.ConfPais.AddAsync(pais);
            await _context.SaveChangesAsync();

            return pais;
            
        }

        public async Task<ConfPais>UpdateAsync(ConfPais pais)
        {
            _context.Entry(pais).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return pais;
        }

        public async Task<bool>DeleteAsync(int id)
        {
            var pais = await _context.ConfPais.FindAsync(id);
            if(pais == null)return false;
            _context.ConfPais.Remove(pais);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}