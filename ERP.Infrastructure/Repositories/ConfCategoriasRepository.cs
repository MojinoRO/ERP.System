using ERP.Domain.Interfaces;
using ERP.Domain.Entities;
using ERP.Infrastructure.Data;
using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;

namespace ERP.Infrastructure.Repositories
{
    public class ConfCategoriasRepository: IConfCatagoriasRepository
    {
        private readonly AppDbContext _context;
        public ConfCategoriasRepository(AppDbContext context) =>_context=context;

        public async Task<IEnumerable<ConfCategorias>> getAllAsync()
        {
            return await _context.ConfCategorias.ToListAsync();
        }

        public async Task<ConfCategorias?>getByIDAsync(int id)
        {
            return await _context.ConfCategorias.FirstOrDefaultAsync(e =>e.CategoriasID==id);
        }
        public async Task<ConfCategorias?>getByCodigoAsync(string codigo)
        {
            return await _context.ConfCategorias.FirstOrDefaultAsync(c=>c.CategoriaCodigo ==codigo);
        }

        public async Task<ConfCategorias>CreateAsync(ConfCategorias categoria)
        {
            _context.ConfCategorias.Add(categoria);
            await _context.SaveChangesAsync();
            return categoria;
        }

        public async Task<ConfCategorias>UpdateAsync(ConfCategorias categorias)
        {
            _context.ConfCategorias.Update(categorias);
            await _context.SaveChangesAsync();
            return categorias;
        }

        public async Task<bool>DeleteAsync(int id)
        {
            var categoria = await _context.ConfCategorias.FirstOrDefaultAsync(e=>e.CategoriasID ==id);
            if(categoria == null)return false;
            _context.ConfCategorias.Remove(categoria);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}