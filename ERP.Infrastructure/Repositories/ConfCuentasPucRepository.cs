using ERP.Domain.Entities;
using ERP.Infrastructure.Data;
using ERP.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Formats.Asn1;

namespace ERP.Infrastructure.Repositories
{
    public class ConfCuentasPucReposiroty : IConfCuentasPucRepository
    {
        private readonly AppDbContext _context;
        public ConfCuentasPucReposiroty(AppDbContext context)=> _context=context;

        public async Task<IEnumerable<ConfCuentasPuc>> GetAllAsync()
        {
            return await _context.ConfCuentasPuc.AsNoTracking()
                .OrderBy(x =>x.CuentasPucCodigo).Take(100).ToListAsync();
        }

        public async Task<IEnumerable<ConfCuentasPuc?>>GetByCodigoAsync(string codigo)
        {
            codigo = codigo.Trim();
            return await _context.ConfCuentasPuc.AsNoTracking()
            .Where(x=>EF.Functions.Like(x.CuentasPucCodigo, $"{codigo}%")).ToListAsync();
        }

        public async Task<ConfCuentasPuc?>GetCallCode(string codigo)
        {
            codigo = codigo.Trim();
            return await _context.ConfCuentasPuc.AsNoTracking().FirstOrDefaultAsync(x=>x.CuentasPucCodigo == codigo);
        }

        public async Task<bool>ValidateCodigoAsync(string codigo)
        {
            codigo = codigo.Trim();
            return await _context.ConfCuentasPuc.AsNoTracking().AnyAsync(x=>x.CuentasPucCodigo == codigo);
        }

        public async Task<ConfCuentasPuc?>GetByIdAsync(int id)
        {
            return await _context.ConfCuentasPuc.AsNoTracking().FirstOrDefaultAsync(x=>x.CuentasPucID == id);
        }
        
        public async Task<ConfCuentasPuc>UpdateMovimientoTercero(ConfCuentasPuc cuenta)
        {
            _context.Attach(cuenta);
            _context.Entry(cuenta).Property(x=>x.CuentaPucMovimiento).IsModified=true;
            _context.Entry(cuenta).Property(x=>x.CuentaPucTercero).IsModified=true;
            await _context.SaveChangesAsync();
            return cuenta;
        }

        public async Task<ConfCuentasPuc>UpdateGeneralAsync(ConfCuentasPuc cuenta)
        {
            _context.Entry(cuenta).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return cuenta;
        }

        public async Task<ConfCuentasPuc>CreateConfCuentasPuc(ConfCuentasPuc cuenta)
        {
            await _context.AddAsync(cuenta);
            await _context.SaveChangesAsync();
            return cuenta;
        }
        
        public async Task<bool>DeleteAsync(int id)
        {
            var entity = await _context.ConfCuentasPuc.FindAsync(id);
            if (entity == null)
                return false;
            _context.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}