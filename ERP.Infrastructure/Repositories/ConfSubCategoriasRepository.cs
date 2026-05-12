using ERP.Domain.Entities;
using ERP.Domain.Interfaces;
using ERP.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ERP.Infrastructure.Repositories
{
    public class ConfSubCategoriasRepository : IConfSubCategoriasRepository
    {
        private readonly AppDbContext _context;

        public ConfSubCategoriasRepository(AppDbContext context) =>_context = context;

        public async Task<IEnumerable<ConfSubCategorias>> getAllAsync()
        {
            return await _context.ConfSubCategorias.Include(x=>x.ConfCategorias).ToListAsync();
        }

        public async Task<ConfSubCategorias?>getByIDAsync(int id)
        {
            return  await _context.ConfSubCategorias.AsNoTracking()
            .FirstOrDefaultAsync(s => s.SubCategoriaID == id);
        }

        public async Task<ConfSubCategorias?>getByCodigoAsync(string codigo , int CategoriaID)
        {
            return await _context.ConfSubCategorias.AsNoTracking().FirstOrDefaultAsync
            (s => s.SubCategoriaCodigo == codigo && s.CategoriaID== CategoriaID );
        }

        public async Task<IEnumerable<ConfSubCategorias>>getByCategoriaID(int categoriaid)
        {
            return await _context.ConfSubCategorias.Where(s=>s.CategoriaID == categoriaid).ToListAsync();
        }

        public async Task<ConfSubCategorias>CreateSubCategoriasAsync(ConfSubCategorias subCategorias)
        {
            _context.ConfSubCategorias.Add(subCategorias);
            await _context.SaveChangesAsync();
            return subCategorias;
        }

        public async Task<ConfSubCategorias>UpdateSubCategoriasAsync(ConfSubCategorias subcategoria)
        {
            _context.ConfSubCategorias.Update(subcategoria);
            await _context.SaveChangesAsync();
            return subcategoria;
        }

        public async Task<bool>deleteSubCategoriasAsync(int id)
        {
            var sub = await _context.ConfSubCategorias.FindAsync(id);
            if(sub == null) return false;
            _context.ConfSubCategorias.Remove(sub);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}