using ERP.Application.Interfaces;
using ERP.Domain.Entities;
using ERP.Application.DTOs;
using ERP.Domain.Interfaces;


namespace ERP.Application.Services
{
    public class ConfUsuariosServices : IConfUsuariosService
    {
        private readonly  IConfUsuariosRepository _repository;

        public ConfUsuariosServices(IConfUsuariosRepository repos)=>_repository=repos;

        public async Task<IEnumerable<ConfUsuariosDTO>> GetAllAsync()
        {
            var Usuario = await _repository.GetAllAsync();
            return Usuario.Select(U => new ConfUsuariosDTO
            {
                UsuarioID = U.UsuarioID,
                UsuarioNombre= U.NombreUsuario,
                ContraseñaUsuario=U.ContraseñaUsuario,
                UsuarioRol=U.RolUsuario,
            });
        }

        public async  Task<ConfUsuariosDTO?>GetByIdAsync(int id)
        {
            var Usuario = await _repository.GetByIdAsync(id);
            if(Usuario == null)return null;
            return new ConfUsuariosDTO
            {
                UsuarioID = Usuario.UsuarioID,
                UsuarioNombre= Usuario.NombreUsuario,
                ContraseñaUsuario= Usuario.ContraseñaUsuario,
                UsuarioRol=Usuario.RolUsuario,
            };
        }

        public async Task<ConfUsuariosDTO>CreateUserAsync(CreateConfUsuariosDTO dto)
        {
            if(string.IsNullOrEmpty(dto.UsuarioNombre))
                throw new ArgumentException("El Nombre de Usuario es requerido");
            if(string.IsNullOrEmpty(dto.ContraseñaUsuario))
                throw new ArgumentException("Clave Obligatoria");
            if(dto.UsuarioRol == 0)
                throw new ArgumentException("Rol requerido");


            var UserNew = new ConfUsuarios
            {
                NombreUsuario=dto.UsuarioNombre,
                ContraseñaUsuario =dto.ContraseñaUsuario,
                RolUsuario= dto.UsuarioRol
            };

            var creado = await _repository.CreateAsync(UserNew);

            return new ConfUsuariosDTO
            {
                UsuarioID=creado!.UsuarioID,
                UsuarioNombre=creado.NombreUsuario,
                ContraseñaUsuario =creado.ContraseñaUsuario,
                UsuarioRol=creado.RolUsuario
            };
        }

        public async Task<ConfUsuariosDTO>UpdateUserAsync(int id,UpdateConfUsuariosDTO dto)
        {
            if(string.IsNullOrEmpty(dto.UsuarioNombre))
                throw new ArgumentException("El Nombre de Usuario es requerido");
            if(string.IsNullOrEmpty(dto.ContraseñaUsuario))
                throw new ArgumentException("Clave Obligatoria");
            if(dto.UsuarioRol==0)
                throw new ArgumentException("Rol requerido");

            var Usuario = await _repository.GetByIdAsync(id);
            if(Usuario == null)
                throw new ArgumentException("Usuario ID no Existe");

            Usuario!.NombreUsuario =dto.UsuarioNombre;
            Usuario.ContraseñaUsuario=dto.ContraseñaUsuario;
            Usuario.RolUsuario=dto.UsuarioRol;

            var UpdateUser = await _repository.UpdateAsync(Usuario);
            return new ConfUsuariosDTO
            {
                UsuarioID=UpdateUser.UsuarioID,
                UsuarioNombre=UpdateUser.NombreUsuario,
                ContraseñaUsuario=UpdateUser.ContraseñaUsuario,
                UsuarioRol=UpdateUser.RolUsuario
            };
        }

        public async Task DeleteAsync(int id)
        {
            var existe = await _repository.GetByIdAsync(id);
            if(existe== null)
                throw new ArgumentException("El Usuario ID a eliminar Incorrecto");
            await _repository.DeleteAsync(id);
        }

        public async Task<ConfUsuariosDTO?>LoginRequest(LoginDto dto)
        {
            var usuario = await _repository.GetByName(dto.UsuarioNombre);
            if(usuario == null)return null;
            if(usuario.ContraseñaUsuario != usuario.ContraseñaUsuario) return null;

            return new ConfUsuariosDTO
            {
                UsuarioID=usuario.UsuarioID,
                UsuarioNombre=usuario.NombreUsuario,
                ContraseñaUsuario=usuario.ContraseñaUsuario,
                UsuarioRol=usuario.RolUsuario,
            };
        }
    }
}