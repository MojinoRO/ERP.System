using ERP.Domain.Entities;
using ERP.Domain.Interfaces;
using ERP.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ERP.Infrastructure.Repositories
{
    public class IntAnticiposRepository : BaseCrudRepository<IntAnticipos , int> , IIntAnticiposRepository
    {

        public IntAnticiposRepository(AppDbContext context):base(context){}

        public async Task<IEnumerable<IntAnticipos>>GetByFechasAsync(DateOnly desde , DateOnly hasta)
        {
            return  await _context.IntAnticipos.AsNoTracking()
            .Where(x=>x.AnticipoFecha>=desde && x.AnticipoFecha<=hasta).ToListAsync();
        }

        public async Task<IEnumerable<IntAnticipos>>GetByFechaTerceroAsync(DateOnly desde , DateOnly hasta , int id , int tipo)
        {
            return await _context.IntAnticipos.AsNoTracking().Where(
                x=>x.AnticipoFecha>=desde && x.AnticipoFecha<=hasta && x.TerceroID== id && x.AnticipoTipo ==tipo
            ).ToListAsync();
        }
    }
}