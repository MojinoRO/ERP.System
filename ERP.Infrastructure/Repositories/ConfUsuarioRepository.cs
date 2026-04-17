using System.Net.NetworkInformation;
using ERP.Domain.Entities;
using ERP.Domain.Interfaces;
using ERP.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ERP.Infrastructure.Repositories
{
    public class ConfUsuariosRepository : IConfUsuariosRepository
    {
        private readonly AppDbContext _context;

        public ConfUsuariosRepository(AppDbContext context)=> _context=context;

        public async Task<IEnumerable<ConfUsuarios>> GetAllAsync()
        {
            return await _context.ConfUsuarios.ToListAsync();    
        }

        public async  Task <ConfUsuarios?> GetByIdAsync(int id)
        {
            return await _context.ConfUsuarios.FirstOrDefaultAsync(e =>e.UsuarioID==id);
        }

        public async Task <ConfUsuarios?> CreateAsync(ConfUsuarios user)
        {
            _context.ConfUsuarios.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task <ConfUsuarios>UpdateAsync(ConfUsuarios user)
        {
            _context.ConfUsuarios.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task DeleteAsync(int id)
        {
            var user = await _context.ConfUsuarios.FindAsync(id);
            if(user != null)
            {
                user.RolUsuario="1";
                await _context.SaveChangesAsync();
            };
        }      

        public async Task<bool>ExistUser(int id)
        {
            return await _context.ConfUsuarios.AnyAsync(u=>u.UsuarioID ==id);
        }
    }
}