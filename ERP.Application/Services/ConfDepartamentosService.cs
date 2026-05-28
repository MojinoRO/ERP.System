using ERP.Application.DTOs;
using ERP.Application.Interfaces;
using ERP.Domain.Interfaces;
using AutoMapper;
using ERP.Application.common;
using ERP.Domain.Entities;

namespace ERP.Application.Services
{
    public class ConfDepartamentosServices : IConfDepartamentoService
    {
        private readonly IConfDepartamentosRepository _repo;
        private readonly IMapper _mapper;

        public ConfDepartamentosServices(IConfDepartamentosRepository repo , IMapper mapper)
        {
            _repo=repo; _mapper=mapper;
        }
        
        public async Task<ServiceResponse<IEnumerable<ConfDepartamentosDTO>>> GetAllAsync()
        {
            var depa = await _repo.GetAllAsync();
            var dto = _mapper.Map<IEnumerable<ConfDepartamentosDTO>>(depa);
            return ServiceResponse<IEnumerable<ConfDepartamentosDTO>>.Ok(dto,"Listado cargo Correctamente");
        }

        public async Task<ServiceResponse<IEnumerable<ConfDepartamentosDTO?>>>GetByNameAsync(string name)
        {
            if(string.IsNullOrWhiteSpace(name)) return ServiceResponse<IEnumerable<ConfDepartamentosDTO?>>.Error("Parametro Invalido");
            var depa = await _repo.GetByNameAsync(name);
            var dto = _mapper.Map<IEnumerable<ConfDepartamentosDTO>>(depa);
            return ServiceResponse<IEnumerable<ConfDepartamentosDTO?>>.Ok(dto, "Listado Cargado Correctamente");
        }

        public async Task<ServiceResponse<ConfDepartamentosDTO?>>GetByIDAsync(int id)
        {
            if(id <= 0)return ServiceResponse<ConfDepartamentosDTO?>.Error("Parametro Invalido");
            var depa = await _repo.GetByIDAsync(id);
            var dto = _mapper.Map<ConfDepartamentosDTO>(depa);
            return ServiceResponse<ConfDepartamentosDTO?>.Ok(dto,"Departamento Cargado Correctamente");
        }

        public async Task<ServiceResponse<ConfDepartamentosDTO?>>GetByCodigoAsync(string codigo)
        {
            if(string.IsNullOrWhiteSpace(codigo)) return ServiceResponse<ConfDepartamentosDTO?>.Error("Parametro Invalido");
            var depa = await _repo.GetByCodigoAsync(codigo);
            var dto = _mapper.Map<ConfDepartamentosDTO>(depa);
            return ServiceResponse<ConfDepartamentosDTO?>.Ok(dto,"Departamento Cargado Correctamente");
        }


        public async Task<ServiceResponse<ConfDepartamentosDTO>>CreateAsync(CreateConfDepartamentosDTO dpto)
        {
            if(dpto == null) return ServiceResponse<ConfDepartamentosDTO>.Error("Datos Invalido ");
            if(string.IsNullOrWhiteSpace(dpto.DepartamentoCodigo)||string.IsNullOrWhiteSpace(dpto.DepartamentoNombre))
            return ServiceResponse<ConfDepartamentosDTO>.Error("Valida Campos en blanco");
            if(dpto.PaisID <= 0) return ServiceResponse<ConfDepartamentosDTO>.Error("Pais no seleccionado");
            dpto.CodigoISO = string.IsNullOrEmpty(dpto.CodigoISO) ? null : dpto.CodigoISO;
            var CodigoOk = await _repo.GetByCodigoAsync(dpto.DepartamentoCodigo);
            if(CodigoOk !=  null)return ServiceResponse<ConfDepartamentosDTO>.Error($"Codigo Ya Existe en {CodigoOk.DepartamentoNombre}");
            var entity = _mapper.Map<ConfDepartamentos>(dpto);
            await _repo.CreateAsync(entity); var dto = _mapper.Map<ConfDepartamentosDTO>(entity);
            return ServiceResponse<ConfDepartamentosDTO>.Ok(dto,"Departamento Creado Correctamente");
        }

        public async Task<ServiceResponse<ConfDepartamentosDTO>>UpdateAsync(UpdateConfDepartamentosDTO dpto)
        {
            if(dpto == null) return ServiceResponse<ConfDepartamentosDTO>.Error("Datos Invalidos");
            if(string.IsNullOrWhiteSpace(dpto.DepartamentoCodigo)||string.IsNullOrWhiteSpace(dpto.DepartamentoNombre))
            return ServiceResponse<ConfDepartamentosDTO>.Error("Valida Campos en blanco");
            var CodigoOk = await _repo.GetByCodigoAsync(dpto.DepartamentoCodigo);
            if(CodigoOk != null && CodigoOk.DepartamentoID !=dpto.DepartamentoID) return ServiceResponse<ConfDepartamentosDTO>
            .Error($"Codigo departamento ya existe en {CodigoOk.DepartamentoNombre}");
            if(dpto.PaisID <= 0) return ServiceResponse<ConfDepartamentosDTO>.Error("Pais no seleccionado");
            dpto.CodigoISO = string.IsNullOrWhiteSpace(dpto.CodigoISO) ? null : dpto.CodigoISO;
            var entity = await _repo.GetByIDAsync(dpto.DepartamentoID);
            if(entity  == null) return ServiceResponse<ConfDepartamentosDTO>.Error("ID No Encontrado");
            _mapper.Map(dpto,entity); await _repo.UpdateAsync(entity); var dto = _mapper.Map<ConfDepartamentosDTO>(entity);
            return ServiceResponse<ConfDepartamentosDTO>.Ok(dto,"Departamento Actualizado Correctamente");
        }

        public async Task<ServiceResponse<bool>>DeleteAsync(int id)
        {
            if(id <= 0) return ServiceResponse<bool>.Error("Parametro Invalido");
            var dpto = await _repo.GetByIDAsync(id);
            if(dpto == null) return ServiceResponse<bool>.Error("Parametro Invalido");
            await _repo.DeleteAsync(dpto.DepartamentoID);
            return ServiceResponse<bool>.Ok(true,"Departamento Eliminado Correctamente");
        }
    }
}