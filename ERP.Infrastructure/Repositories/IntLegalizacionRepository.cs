using ERP.Domain.Entities;
using ERP.Domain.Interfaces;
using ERP.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ERP.Infrastructure.Repositories
{
    public class IntLegalizacionTransportadoresRepository : IIntLegalizacionTransportadoresRepository
    {
        private readonly AppDbContext _context;
        public IntLegalizacionTransportadoresRepository(AppDbContext context) => _context=context;

        public async Task<IEnumerable<IntLegalizacionTransportadores>>GetByFecha(DateOnly fechadesde, DateOnly fechahasta, int TercerosID)
        {
            return await _context.IntLegalizacionTransportadores.AsNoTracking()
            .Where(x=> x.FechaLegalizacion>=fechadesde && x.FechaLegalizacion <=fechahasta && x.TerceroID ==TercerosID).ToListAsync();
        }

        public async Task<IntLegalizacionTransportadores?>GetById(int id)
        {
            return await _context.IntLegalizacionTransportadores.AsNoTracking()
            .FirstOrDefaultAsync(x=>x.LegalizacionID == id);
        }
        public async Task<IntLegalizacionTransportadores>CreateLegalizacion(IntLegalizacionTransportadores data)
        {
            await _context.IntLegalizacionTransportadores.AddAsync(data);
            await _context.SaveChangesAsync();
            return data;
        }

        public async Task<IntLegalizacionTransportadores>UpdateLegalizacion(IntLegalizacionTransportadores data)
        {
           _context.Entry(data).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return data;
        }

        public async Task<bool>DeleteLegalizacion(int id)
        {
            var entity = await _context.IntLegalizacionTransportadores.FindAsync(id);
            if (entity is null)
                return false;
            _context.IntLegalizacionTransportadores.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        
    }
}