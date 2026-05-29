using System.Net.Http.Headers;
using ERP.Domain.Entities;
using ERP.Domain.Interfaces;
using ERP.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

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

        public async Task<IEnumerable<ConfCiudades>>GetByName(string name)
        {
            return await _context.ConfCiudades.AsNoTracking()
            .Where(C=>EF.Functions.Like)
        }
    }
}