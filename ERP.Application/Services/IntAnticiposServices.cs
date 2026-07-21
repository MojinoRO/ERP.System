using ERP.Application.DTOs;
using ERP.Application.Interfaces;
using ERP.Domain.Interfaces;
using ERP.Domain.Entities;
using AutoMapper;
using ERP.Application.common;
namespace ERP.Application.Services
{
    public class IntAnticiposService : 
        BaseCrudService<IntAnticipos,IntAnticiposDto,CreateIntAnticiposDto,UpdateIntAnticiposDto,int> 
        , IIntAnticiposServices
    {
        private readonly IIntAnticiposRepository _Repo;
        public IntAnticiposService(IIntAnticiposRepository repo ,IMapper mapper)
            :base(repo, mapper) =>_Repo=repo;

        public async Task<ServiceResponse<IEnumerable<IntAnticiposDto>>>GetByFechasAsync(DateOnly desde , DateOnly hasta)
        {
            var error = ServiceValidate.ValidateRangoFechas(desde,hasta);
            if(error != null)
                return ServiceResponse<IEnumerable<IntAnticiposDto>>.Error(error);
            var lista = await _Repo.GetByFechasAsync(desde, hasta);
            if(!lista.Any())
                return ServiceResponse<IEnumerable<IntAnticiposDto>>.Error(Messages.NotFound);
            return ServiceResponse<IEnumerable<IntAnticiposDto>>.Ok(_mapper.Map<IEnumerable<IntAnticiposDto>>(lista), Messages.SuccessfulChanged);
        }
        public async Task<ServiceResponse<IEnumerable<IntAnticiposDto>>>GetByFechaTerceroAsync(DateOnly desde , DateOnly hasta , int id)
        {
            var error = ServiceValidate.ValidateRangoFechas(desde, hasta);
            if (error != null)
                return ServiceResponse<IEnumerable<IntAnticiposDto>>.Error(error);
            var lista = await _Repo.GetByFechaTerceroAsync(desde, hasta, id);
            if (!lista.Any())
                return ServiceResponse<IEnumerable<IntAnticiposDto>>.Error(Messages.NotFound);
            return ServiceResponse<IEnumerable<IntAnticiposDto>>
            .Ok(_mapper.Map<IEnumerable<IntAnticiposDto>>(lista), Messages.SuccessfulChanged);

        }
    }
}