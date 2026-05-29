using ERP.Application.DTOs;
using ERP.Application.common;
using ERP.Application.Interfaces;
using System.Runtime.CompilerServices;
using ERP.Domain.Interfaces;
using AutoMapper;
using ERP.Domain.Entities;
using System.Reflection.Metadata;

namespace ERP.Application.Services
{
    public class ConfCiudadesServices : IConfCiudadesService
    {
        private readonly IConfCiudadesRepository _repo;
        private readonly IMapper _Mapper;

        public ConfCiudadesServices(IConfCiudadesRepository repo , IMapper mapper)
        {
            _repo = repo;
            _Mapper = mapper;
        }

        public async Task<ServiceResponse<IEnumerable<ConfCiudadesDTO>>> GetAllAsync()
        {
            var listado = await _repo.GetAllAsync();
            var dto = _Mapper.Map<IEnumerable<ConfCiudadesDTO>>(listado);
            return ServiceResponse<IEnumerable<ConfCiudadesDTO>>.Ok(dto,"Listado Cargado Correctamente");
        }

        public async Task<ServiceResponse<IEnumerable<ConfCiudadesDTO?>>>GetByNameAsync(string name)
        {
            if(string.IsNullOrWhiteSpace(name)) return ServiceResponse<IEnumerable<ConfCiudadesDTO?>>.Error("Parametro Invalido");
            var listado = await _repo.GetByName(name);
            var dto = _Mapper.Map<IEnumerable<ConfCiudadesDTO?>>(listado);
            return ServiceResponse<IEnumerable<ConfCiudadesDTO?>>.Ok(dto,"Listado Generado Correctamente");
        }

        public async Task<ServiceResponse<ConfCiudadesDTO?>>GetByCodigoAsync(string codigo)
        {
            if(string.IsNullOrWhiteSpace(codigo)) return ServiceResponse<ConfCiudadesDTO?>.Error("Parametro Invalido");
            var listado = await _repo.GetByCodigoAsyc(codigo);
            var dto = _Mapper.Map<ConfCiudadesDTO?>(listado);
            return ServiceResponse<ConfCiudadesDTO?>.Ok(dto,"Listado Generado Correctamente");
        }

        public async Task<ServiceResponse<ConfCiudadesDTO?>>GetByIdAsync(int id)
        {
            if(id <= 0) return ServiceResponse<ConfCiudadesDTO?>.Error("Parametro Invalido");
            var listado = await _repo.GetByIDAsync(id);
            var dto = _Mapper.Map<ConfCiudadesDTO>(listado);
            return ServiceResponse<ConfCiudadesDTO?>.Ok(dto,"Listado Generado Correctamente");
        }

        public async Task<ServiceResponse<ConfCiudadesDTO>>CreateAsync(CreateConfCiudadesDTO ciudad)
        {
            if(!ServiceValidate.ValidateRequired(ciudad))return ServiceResponse<ConfCiudadesDTO>.Error("Campos Obligatorios En Blanco");
            var CodigoOk = await _repo.GetByCodigoAsyc(ciudad.CiudadCodigo);
            if(CodigoOk != null)return ServiceResponse<ConfCiudadesDTO>.Error($"Codigo Ya Existe en {CodigoOk.CiudadNombre}");
            if(ciudad.DepartamentoID <=0 )return ServiceResponse<ConfCiudadesDTO>.Error("Departamento No seleccionado");
            ciudad.CodigoDian = string.IsNullOrWhiteSpace(ciudad.CodigoDian) ? null : ciudad.CodigoDian;
            var entyty = _Mapper.Map<ConfCiudades>(ciudad);
            await _repo.CreateAsync(entyty);
            var dto = _Mapper.Map<ConfCiudadesDTO>(entyty);
            return ServiceResponse<ConfCiudadesDTO>.Ok(dto,"Ciudad Creada Correctamente");
        }

        public async Task<ServiceResponse<ConfCiudadesDTO>>UpdateAsync(UpdateConfCiudadesDTO ciudad)
        {
            if(!ServiceValidate.ValidateRequired(ciudad))return ServiceResponse<ConfCiudadesDTO>.Error("Campos Obligatorios En Blanco");
            var CodigoOk = await _repo.GetByCodigoAsyc(ciudad.CiudadCodigo);
            if(CodigoOk != null && CodigoOk.CiudadID != ciudad.CiudadID)return ServiceResponse<ConfCiudadesDTO>.Error($"Codigo Ya Existe en {CodigoOk.CiudadNombre}");
            if(ciudad.DepartamentoID <=0 )return ServiceResponse<ConfCiudadesDTO>.Error("Departamento No seleccionado");
            ciudad.CodigoDian = string.IsNullOrWhiteSpace(ciudad.CodigoDian) ? null : ciudad.CodigoDian;
            var entyty = await _repo.GetByIDAsync(ciudad.CiudadID);
            if(entyty == null)return ServiceResponse<ConfCiudadesDTO>.Error("id no encontrado");
            _Mapper.Map(ciudad,entyty);
            await _repo.UpdateAsync(entyty);
            var dto = _Mapper.Map<ConfCiudadesDTO>(entyty);
            return ServiceResponse<ConfCiudadesDTO>.Ok(dto,"Ciudad Actualizada Correctamente");
        }

        public async Task<ServiceResponse<bool>>DeleteAsync(int id)
        {
            var entity = await _repo.GetByIDAsync(id);
            if(entity == null )return ServiceResponse<bool>.Error("id no encontrado");
            await _repo.DeleteAsync(id);
            return ServiceResponse<bool>.Ok(true,"CiudadElimnada Correctamente");
        }
    }
}