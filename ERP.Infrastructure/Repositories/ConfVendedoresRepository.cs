
using ERP.Domain.Entities;
using ERP.Domain.Interfaces;
using ERP.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ERP.Infrastructure.Repositories
{
    
    public class ConfVendedoresRepository : IConfVendedoresRepository
    {
        private readonly AppDbContext _context;

        public ConfVendedoresRepository(AppDbContext context) => _context=context;

        public async Task<IEnumerable<ConfVendedores>> GetAllAsync()
        {
            return await _context.ConfVendedores.ToListAsync();
        }

        public async  Task<ConfVendedores?>GetById(int id)
        {
            return await  _context.ConfVendedores.FirstOrDefaultAsync(e =>e.VendedorID ==id);
        }

        public async Task<ConfVendedores>CreateAsync(ConfVendedores vendedorNew)
        {
            _context.ConfVendedores.Add(vendedorNew);
            await _context.SaveChangesAsync();
            return vendedorNew;
        }

        public async Task<ConfVendedores>UPdateAsync(ConfVendedores vendedorUpdate)
        {
            _context.ConfVendedores.Update(vendedorUpdate);
            await _context.SaveChangesAsync();
            return  vendedorUpdate;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var vendedor = await _context.ConfVendedores.FindAsync(id);
            if(vendedor == null)
            {
                return false;
            }
             _context.ConfVendedores.Remove(vendedor);
             await _context.SaveChangesAsync();
             return true;
        }

        public async Task<bool>ExisteAsync(int id)
        {
            var Vendedor = await _context.ConfVendedores.FindAsync(id);
            return Vendedor != null;
        }

        public async Task <ConfVendedores?> GetByCodigoAsync(string codigo)
        {
            return await _context.ConfVendedores.FirstOrDefaultAsync(e => e.CodigoVendedor == codigo);
        }
    }
}