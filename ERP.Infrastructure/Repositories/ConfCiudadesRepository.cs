using System.Diagnostics;
using System.Net.Http.Headers;
using System.Runtime.CompilerServices;
using Azure.Identity;
using ERP.Domain.Entities;
using ERP.Domain.Interfaces;
using ERP.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Operations;

namespace ERP.Infrastructure.Repositories
{
    public class ConfCiudadesRepository : IConfCiudadesRepository
    {
        private readonly AppDbContext _context;
        public ConfCiudadesRepository(AppDbContext context ) => _context = context;

        public async Task<IEnumerable<ConfCiudades>> GetAllAsync()
        {
            return await _context.ConfCiudades.AsNoTracking().Include(c =>c.ConfDepartamento)
            .OrderBy(c=>c.CiudadNombre).ToListAsync();
        }

        public async Task<IEnumerable<ConfCiudades?>>GetByName(string name)
        {
            return await _context.ConfCiudades.AsNoTracking()
            .Where(C=>EF.Functions.Like(C.CiudadNombre, $"%{name}%")).ToListAsync();
        }

        public async Task<ConfCiudades?>GetByCodigoAsyc(string codigo)
        {
            return await _context.ConfCiudades.AsNoTracking()
            .FirstOrDefaultAsync(c => c.CiudadCodigo == codigo);
        }

        public async Task<ConfCiudades?>GetByIDAsync(int id)
        {
            return await _context.ConfCiudades.AsNoTracking()
            .FirstOrDefaultAsync(c=>c.CiudadID == id);
        }

        public async Task<ConfCiudades>CreateAsync(ConfCiudades ciudad)
        {
            await _context.ConfCiudades.AddAsync(ciudad);
            await _context.SaveChangesAsync();
            return ciudad;
        }

        public async Task<ConfCiudades>UpdateAsync(ConfCiudades ciudad)
        {
            _context.Entry(ciudad).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return ciudad;
        }

        public async Task<bool>DeleteAsync(int id)
        {
            var ciudad = await _context.ConfCiudades.FindAsync(id);
            if(ciudad == null)return false;
            _context.ConfCiudades.Remove(ciudad);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}