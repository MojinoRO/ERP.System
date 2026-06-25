using System.Runtime.InteropServices;
using AutoMapper;
using ERP.Application.common;
using ERP.Application.DTOs;
using ERP.Application.Interfaces;
using ERP.Domain.Interfaces;

namespace ERP.Application.Services
{
    public class ConfCuentasPucService : IConfCuentasPucService
    {
        private readonly IConfCuentasPucRepository _repo;
        private readonly IMapper _mapper;

        public ConfCuentasPucService(IConfCuentasPucRepository repo , IMapper mapper)
        {
            _mapper=mapper;
            _repo=repo;
        }

        public async Task<ServiceResponse<IEnumerable<ConfCuentasPucDto>>> GetAllAsync()
        {
            var cuentasPuc = await _repo.GetAllAsync();
            if(cuentasPuc == null) 
                return ServiceResponse<IEnumerable<ConfCuentasPucDto>>.Error("No hay cuentas para mostrar");
            var dto = _mapper.Map<IEnumerable<ConfCuentasPucDto>>(cuentasPuc);
            return ServiceResponse<IEnumerable<ConfCuentasPucDto>>.Ok(dto,"Listado Cargado Correctamete");
        }

        public async Task<ServiceResponse<IEnumerable<ConfCuentasPucDto?>>>GetByCodigo(string codigo)
        {
            if(string.IsNullOrWhiteSpace(codigo))return ServiceResponse<IEnumerable<ConfCuentasPucDto?>>.Error("Parametro Invalido");
            var cuentasFiltradas = await _repo.GetByCodigoAsync(codigo);
            var dto = _mapper.Map<IEnumerable<ConfCuentasPucDto?>>(cuentasFiltradas);
            return ServiceResponse<IEnumerable<ConfCuentasPucDto?>>.Ok(dto, "Listado generado con exito");
        }

        public async Task<ServiceResponse<bool>>ValidateCodigoAsync(string codigo)
        {
            if(string.IsNullOrWhiteSpace(codigo))return ServiceResponse<bool>.Error("Parametro Invalido");
            var existe = await _repo.ValidateCodigoAsync(codigo);
            if(!existe)
                return ServiceResponse<bool>.Error("Codigo No existe");
            return ServiceResponse<bool>.Ok(existe,"Codigo Existe");
            
        }

        public async Task<ServiceResponse<ConfCuentasPucDto?>>GetByIdAsync(int id)
        {
           if (id <= 0) 
                return ServiceResponse<ConfCuentasPucDto?>.Error("Id Cuenta Puc Invalido");
            var existe = await _repo.GetByIdAsync(id);
            if (existe == null)
                return ServiceResponse<ConfCuentasPucDto?>.Error("Id no existe");
            var dto = _mapper.Map<ConfCuentasPucDto>(existe);
            return ServiceResponse<ConfCuentasPucDto?>.Ok(dto, "Id encontrado");
        }

        public async Task<ServiceResponse<ConfCuentasPucDto>>UpdateMovimientoTercero(UpdateConfCuentasPucDto dto)
        {
            if (!ServiceValidate.ValidateRequired(dto))return ServiceResponse<ConfCuentasPucDto>.Error("Parámetros inválidos");
            var entity = await _repo.GetByIdAsync(dto.CuentasPucID);
            if (entity == null)return ServiceResponse<ConfCuentasPucDto>.Error("Cuenta no encontrada");
            _mapper.Map(dto, entity);
            var updated = await _repo.UpdateMovimientoTercero(entity);
            var response = _mapper.Map<ConfCuentasPucDto>(updated);
             return ServiceResponse<ConfCuentasPucDto>
                .Ok(response, "Cuenta actualizada correctamente");
        }
    }
}