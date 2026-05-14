using System.ComponentModel.Design;
using ERP.Domain.Entities;
using ERP.Domain.Interfaces;
using ERP.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ERP.Infrastructure.Repositories
{
    public class ConfMarcasRepository : IConfMarcasRepository
    {
        private readonly AppDbContext _context;
        public ConfMarcasRepository(AppDbContext context)=> _context=context;

        public async Task<IEnumerable<ConfMarcas>> GetAllAsync()
        {
            return await _context.ConfMarcas.ToListAsync();
        }

        public async Task<IEnumerable<ConfMarcas?>>GetByNameAsync(string nombre)
        {
            if(string.IsNullOrWhiteSpace(nombre))
                throw new ArgumentException(nameof(nombre));
            return await _context.ConfMarcas
                .Where(x =>x.MarcaNombre.Contains(nombre)).ToListAsync();
        }

        public async Task<ConfMarcas?>GetByIDAsync(int id)
        {
            if(id == 0)
                throw new ArgumentException("ID incorrecto");
            return await _context.ConfMarcas
                .FirstOrDefaultAsync(x => x.MarcaID == id);
        }

        public async Task<ConfMarcas?>GetByCodigoAsync(string codigo)
        {
            if(string.IsNullOrWhiteSpace(codigo))
                throw new ArgumentException(nameof(codigo));
            return await _context.ConfMarcas.FirstOrDefaultAsync(x=>x.CodigoMarca == codigo);
        }

        public async Task<ConfMarcas>CreateAsync(ConfMarcas marca)
        {
            _context.ConfMarcas.Add(marca);
            await _context.SaveChangesAsync();
            return marca;
        }

        public async Task<ConfMarcas>UpdateAsync(ConfMarcas marca)
        {
            _context.ConfMarcas.Update(marca);
            await _context.SaveChangesAsync();
            return marca;
        }

        public async Task<bool>DeleteAsync(int marcaid)
        {
            var sub = await _context.ConfMarcas.FindAsync(marcaid);
            if(sub == null) return false;
            _context.ConfMarcas.Remove(sub);
            await _context.SaveChangesAsync();
            return true;
        }
    }

}