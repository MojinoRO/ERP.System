using AutoMapper;
using ERP.Application.DTOs;
using ERP.Application.Interfaces;
using ERP.Domain.Interfaces;
using ERP.Domain.Entities;
using System.Diagnostics;
using System.Reflection.Metadata;
namespace ERP.Application.Services
{
    public class ConfAlmacenesServices : IConfAlmacenesServices
    {
        private readonly IConfAlmacenesRepository _repo;
        private readonly IMapper _maper;

        public ConfAlmacenesServices(IConfAlmacenesRepository repo , IMapper mapper)
        {
            _maper=mapper;
            _repo= repo;
        }

        public async Task<IEnumerable<ConfAlmacenDTO>> GetAllAsync()
        {
            var lista = await _repo.GetAllAsync();
            return _maper.Map<IEnumerable<ConfAlmacenDTO>>(lista);
        }

        public async Task<IEnumerable<ConfAlmacenDTO?>>GetByNameAsync(string nombre)
        {
            if(string.IsNullOrWhiteSpace(nombre))
                throw new ArgumentException("parametro invalido");
            var listbyname = await _repo.GetByNameAsync(nombre);
            return _maper.Map<IEnumerable<ConfAlmacenDTO>>(listbyname);
        }

        public async Task<ConfAlmacenDTO?>GetByIDAsync(int id)
        {
            if(id == 0)
                throw new ArgumentException("Parametro Invalido");
            var Almacen = await _repo.GetByIDAsync(id);
            return _maper.Map<ConfAlmacenDTO>(Almacen);
        }

        public async Task<ConfAlmacenDTO?>GetByCodigoAsync(string codigo)
        {
            if(string.IsNullOrWhiteSpace(codigo))
                throw new ArgumentException("Parametro Invalido");
            var almacen = await _repo.GetByCodigoAsync(codigo);
            return _maper.Map<ConfAlmacenDTO>(almacen);
        }

        public async Task<ConfAlmacenDTO>CreateAlmacenAsync(CreateConfAlmacenDTO almacen)
        {
            if(almacen == null)
                throw new ArgumentException("Almacen sin datos");
            if(string.IsNullOrWhiteSpace(almacen.AlmacenCodigo)|| string.IsNullOrWhiteSpace(almacen.AlmacenNombre))
                throw new ArgumentException("Datos Incompletos");
            
            var CodigoOk = await _repo.GetByCodigoAsync(almacen.AlmacenCodigo);
            if(CodigoOk != null)
                throw new ArgumentException("codigo de almacen ya existe");
            
            var alma = _maper.Map<ConfAlmacenes>(almacen);
            await _repo.CrearAlmacenAsync(alma);
            return _maper.Map<ConfAlmacenDTO>(alma);
        }

        public async Task<ConfAlmacenDTO>UpdateAlmacenAsync(UpdateConfAlmacenDTO almacen)
        {
            if (almacen == null)
                throw new ArgumentException("Almacen sin datos");

            if (string.IsNullOrWhiteSpace(almacen.AlmacenCodigo) ||
                string.IsNullOrWhiteSpace(almacen.AlmacenNombre))
                throw new ArgumentException("Datos incompletos");

            var entity = await _repo.GetByIDAsync(almacen.AlmacenID);

            if (entity == null)
                throw new ArgumentException("El almacén no existe");

            var codigoExist = await _repo.GetByCodigoAsync(almacen.AlmacenCodigo);

            if (codigoExist != null &&
                codigoExist.AlmacenID != almacen.AlmacenID)
                throw new ArgumentException("El código ya existe");

            _maper.Map(almacen, entity);

            await _repo.UpdateAlmacenAsync(entity);

            return _maper.Map<ConfAlmacenDTO>(entity);
        }

        public async Task<bool>DeleteAsync(int id)
        {
            var Almacen = await _repo.GetByIDAsync(id);
            if(Almacen == null)
                throw new ArgumentException("AlmacenID no existe en la bd");
            await _repo.DeleteAsync(id);
            return true;
        }
    }
}