using ERP.Domain.Entities;
using ERP.Infrastructure.Data;
using ERP.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ERP.Infrastructure.Repositories
{
    public class ConfCuentasPucReposiroty : IConfCuentasPucRepository
    {
        private readonly AppDbContext _context;
        public ConfCuentasPucReposiroty(AppDbContext context)=> _context=context;

        public async Task<IEnumerable<ConfCuentasPuc>> GetAllAsync()
        {
            return await _context.ConfCuentasPuc.AsNoTracking().ToListAsync();
        }

    }
}