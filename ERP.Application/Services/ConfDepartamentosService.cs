using ERP.Application.DTOs;
using ERP.Application.Mapping;
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

    }
}