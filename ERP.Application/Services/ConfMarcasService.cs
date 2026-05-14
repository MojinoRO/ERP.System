using AutoMapper;
using ERP.Application.DTOs;
using ERP.Application.Interfaces;
using ERP.Domain.Entities;
using ERP.Domain.Interfaces;

namespace ERP.Application.Services
{
    public class ConfMarcasService : IConfMarcaservice
    {
        private readonly IConfMarcasRepository _repo;
        private readonly IMapper _mapper;
        public ConfMarcasService(IConfMarcasRepository repo , IMapper mapper)
        {
            _repo=repo;
            _mapper=mapper;
        } 
        public async Task<IEnumerable<ConfMarcasDto>> GetAllAsync()
        {
            var marca = await _repo.GetAllAsync();
            return _mapper.Map<IEnumerable<ConfMarcasDto>>(marca);
        }
        public async Task<IEnumerable<ConfMarcasDto?>>GetByNombreAsync(string nombre)
        {
            var marca = await _repo.GetByNameAsync(nombre);
            return _mapper.Map<IEnumerable<ConfMarcasDto>>(marca);
        }
        public async Task<ConfMarcasDto?>GetByCodigoAsync(string codigo)
        {
            var marca  = await _repo.GetByCodigoAsync(codigo);
            if(marca == null)return null;
            return _mapper.Map<ConfMarcasDto>(marca);

        }

        public async Task<ConfMarcasDto?>GetByIdAsync(int id)
        {
            var marca = await _repo.GetByIDAsync(id);
            if(marca == null) return null;
            return _mapper.Map<ConfMarcasDto>(marca);
        }

        public async Task<ConfMarcasDto>CreateAsync(CreateConfMarcasDto marca)
        {
            if(marca == null)
                throw new ArgumentException(nameof(marca));
            if(string.IsNullOrEmpty(marca.CodigoMarca)|| string.IsNullOrEmpty(marca.MarcaNombre))
                throw new ArgumentException(nameof(marca));
            var CodigoOk = await _repo.GetByCodigoAsync(marca.CodigoMarca);
            if(CodigoOk != null)
                throw new ArgumentException("Codigo de marca ya existe");          
            var MarcaNew = _mapper.Map<ConfMarcas>(marca);
            await _repo.CreateAsync(MarcaNew);
            return _mapper.Map<ConfMarcasDto>(MarcaNew);      
        }

        public async Task<ConfMarcasDto>UpdateAsync(UpdateConfMarcasDto marca)
        {
            if(marca == null)
                throw new ArgumentException(nameof(marca));
            if(string.IsNullOrEmpty(marca.CodigoMarca)|| string.IsNullOrEmpty(marca.MarcaNombre))
                throw new ArgumentException(nameof(marca));
            if(marca.MarcaID == 0)
                throw new ArgumentException("MarcaID No existe");  
            var update = _mapper.Map<ConfMarcas>(marca);
            await _repo.UpdateAsync(update);
            return _mapper.Map<ConfMarcasDto>(update);
        }

        public async Task<bool>DeleteAsync(int id)
        {
            if(id == 0)
                 throw new ArgumentException("MarcaID no Existe");
            var marcaid = await _repo.GetByIDAsync(id);
            if(marcaid == null) return false;
            return await _repo.DeleteAsync(id);
            
        }
    }
}
