using ERP.Application.DTOs;
using ERP.Application.Mapping;
using ERP.Application.Interfaces;
using ERP.Application.common;
using ERP.Domain.Interfaces;
using AutoMapper;
using System.ComponentModel.DataAnnotations;
using ERP.Domain.Entities;
using System.Dynamic;

namespace ERP.Application.Services
{
    public class ConfPaisService : IConfPaisServices
    {
        private readonly IConfPaisRepository _repo;
        private readonly IMapper _mapping;

        public ConfPaisService(IConfPaisRepository repo , IMapper mapper)
        {
            _mapping=mapper;
            _repo= repo; 
        }
        public async Task<ServiceResponse<IEnumerable<ConfPaisDto>>>GetAllAsync()
        {
            var paises = await _repo.GetAllAsync();
            var dto = _mapping.Map<IEnumerable<ConfPaisDto>>(paises);
            return ServiceResponse<IEnumerable<ConfPaisDto>>.Ok(dto,"Listado generado");
        }

        public async Task<ServiceResponse<IEnumerable<ConfPaisDto?>>>GetByName(string name)
        {
            if (string.IsNullOrWhiteSpace(name)) return ServiceResponse<IEnumerable<ConfPaisDto?>>.Error("Parametro nombre invalido");
            var Listado = await _repo.GetByNameAsync(name);
            var dto = _mapping.Map<IEnumerable<ConfPaisDto?>>(Listado);
            return ServiceResponse<IEnumerable<ConfPaisDto?>>.Ok(dto,"Listado cargado correctamente");
        }

        public async Task<ServiceResponse<ConfPaisDto?>>GetByCodigo(string codigo)
        {
            if(string.IsNullOrWhiteSpace(codigo)) return ServiceResponse<ConfPaisDto?>.Error("Codigo Vacio");

            var Pais = await _repo.GetByCodigoAsync(codigo);
            var dto = _mapping.Map<ConfPaisDto>(Pais);
            return ServiceResponse<ConfPaisDto?>.Ok(dto , "Codigo Encontrado");
        }
        public async Task<ServiceResponse<ConfPaisDto?>>GetByIDAsync(int id)
        {
            if(id == 0) return ServiceResponse<ConfPaisDto?>.Error("Parametro Invalido");
            var Pais = await _repo.GetByIDAsync(id);
            var dto =  _mapping.Map<ConfPaisDto>(Pais);
            return ServiceResponse<ConfPaisDto?>.Ok(dto,"Codigo Encontrado");
        }

        public async Task<ServiceResponse<ConfPaisDto>> CreatePaisAsync(CreateConfPaisDtos pais)
        {
            if(pais == null) return ServiceResponse<ConfPaisDto>.Error("Pais En Blanco");

            if (string.IsNullOrWhiteSpace(pais.CodigoPais) ||
            string.IsNullOrWhiteSpace(pais.NombrePais) ||
            string.IsNullOrWhiteSpace(pais.CodigoAlfa)) 
                return ServiceResponse<ConfPaisDto>.Error("Revisa Campos en Blanco");

            var CodigoOk = await _repo.GetByCodigoAsync(pais.CodigoPais);
            if(CodigoOk != null) return ServiceResponse<ConfPaisDto>.Error("Codigo De Pais Ya Existe");

            var entity = _mapping.Map<ConfPais>(pais);
            await _repo.CreateAsync(entity);
            var dto = _mapping.Map<ConfPaisDto>(entity);
            return ServiceResponse<ConfPaisDto>.Ok(dto,"Pais Creado Correctamente");
        }

        public async Task<ServiceResponse<ConfPaisDto>>UpdatePaisAsync(UpdateConfPaisDtos pais)
        {
            if(pais == null) return ServiceResponse<ConfPaisDto>.Error("Pais En Blanco");
            if (string.IsNullOrWhiteSpace(pais.CodigoPais) ||
            string.IsNullOrWhiteSpace(pais.NombrePais) ||
            string.IsNullOrWhiteSpace(pais.CodigoAlfa)) return ServiceResponse<ConfPaisDto>.Error("Revisa Campos En Blanco");
            var CodigoOk = await _repo.GetByCodigoAsync(pais.CodigoPais);
            if(CodigoOk != null && CodigoOk.PaisID != pais.PaisID) return ServiceResponse<ConfPaisDto>.Error("Codigo De Pais Ya creado");
            var entity = await _repo.GetByIDAsync(pais.PaisID);
            if(entity == null) return ServiceResponse<ConfPaisDto>.Error("Pais No Existe");
            _mapping.Map(pais,entity);
            await _repo.UpdateAsync(entity);
            var dto = _mapping.Map<ConfPaisDto>(entity);
            return ServiceResponse<ConfPaisDto>.Ok(dto,"Pais Actualizado Correctamente");
        }

        public async Task<ServiceResponse<bool>> DeleteAsync(int id)
        {
            var PaisBD = await _repo.GetByIDAsync(id);
            if(PaisBD == null) return ServiceResponse<bool>.Error("ID Invalido");
            await _repo.DeleteAsync(id);
            return ServiceResponse<bool>.Ok(true,"Pais Eliminado Correctamente");
        }
    }
}