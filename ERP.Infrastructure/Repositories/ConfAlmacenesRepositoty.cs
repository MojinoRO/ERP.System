using System.ComponentModel;
using System.Diagnostics;
using System.Numerics;
using ERP.Domain.Entities;
using ERP.Domain.Interfaces;
using ERP.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ERP.Infrastructure.Repositories
{
    public class ConfAlmacenesRepository : IConfAlmacenesRepository
    {
        private readonly AppDbContext _context;
        public ConfAlmacenesRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ConfAlmacenes>> GetAllAsync()
        {
            return await _context.ConfAlmacenes
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<IEnumerable<ConfAlmacenes?>> GetByNameAsync(string name)
        {
            return await _context.ConfAlmacenes
                .AsNoTracking()
                .Where(x => EF.Functions.Like(x.AlmacenNombre, $"%{name}%"))
                .ToListAsync();
        }

        public async Task<ConfAlmacenes?> GetByCodigoAsync(string codigo)
        {
            return await _context.ConfAlmacenes
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.AlmacenCodigo == codigo);
        }

        public async Task<ConfAlmacenes?> GetByIDAsync(int id)
        {
            return await _context.ConfAlmacenes
                .FirstOrDefaultAsync(x => x.AlmacenID == id);
        }

        public async Task<ConfAlmacenes> CrearAlmacenAsync(ConfAlmacenes almacen)
        {
            await _context.ConfAlmacenes.AddAsync(almacen);
            await _context.SaveChangesAsync();

            return almacen;
        }

        public async Task<ConfAlmacenes> UpdateAlmacenAsync(ConfAlmacenes almacen)
        {
            _context.Entry(almacen).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return almacen;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var almacen = await _context.ConfAlmacenes.FindAsync(id);

            if (almacen == null)
                return false;

            _context.ConfAlmacenes.Remove(almacen);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}