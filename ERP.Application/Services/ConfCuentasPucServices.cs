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

        public async Task<ServiceResponse<IEnumerable<ConfCuentasPucDto>>>GetByCodigo(string codigo)
        {
            if(string.IsNullOrWhiteSpace(codigo))return ServiceResponse<IEnumerable<ConfCuentasPucDto>>.Error("Parametro Invalido");
            var cuentasFiltradas = await _repo.GetByCodigo(codigo);
            var dto = _mapper.Map<IEnumerable<ConfCuentasPucDto>>(cuentasFiltradas);
            return ServiceResponse<IEnumerable<ConfCuentasPucDto>>.Ok(dto, "Listado generado con exito ");
        }
    }
}