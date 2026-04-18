using ERP.Domain.Entities;
using ERP.Domain.Interfaces;
using ERP.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
namespace ERP.Infrastructure.Repositories
{
    public class ConfEmpresaRepository : IConfEmpresaRepository
    {
        private readonly AppDbContext _Context;
        public ConfEmpresaRepository(AppDbContext Context) => _Context=Context;

        public async Task<IEnumerable<ConfEmpresa>> GetAllAsync()
        {
            return await _Context.ConfEmpresa.ToListAsync();
        }

        public async Task<ConfEmpresa?>GetByIDAsync(int id)
        {
            return await _Context.ConfEmpresa.FirstOrDefaultAsync(e=>e.EmpresaID == id);
        }

        public async Task<ConfEmpresa>CreateEmpresaAsync(ConfEmpresa empresa)
        {
            _Context.ConfEmpresa.Add(empresa);
            await _Context.SaveChangesAsync();
            return empresa;
        }

        public async Task<ConfEmpresa>UpdateEmpresaAsync( ConfEmpresa empresa)
        {
            _Context.ConfEmpresa.Update(empresa);
            await _Context.SaveChangesAsync();
            return empresa;
        }
    }
}