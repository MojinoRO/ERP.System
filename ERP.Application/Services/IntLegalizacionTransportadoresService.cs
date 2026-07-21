using ERP.Application.DTOs;
using ERP.Application.common;
using ERP.Application.Interfaces;
using ERP.Domain.Interfaces;
using AutoMapper;
using ERP.Domain.Entities;

namespace ERP.Application.Services
{
    public class IntLegalizacionTransportadoresService : IIntLegalizacionTransportadoresService
    {
        private readonly IIntLegalizacionTransportadoresRepository _repo;
        private readonly IMapper _maper;

        public IntLegalizacionTransportadoresService(IIntLegalizacionTransportadoresRepository repo , IMapper mapper)
        {
            _repo=repo;
            _maper=mapper;
        }

        public async Task<ServiceResponse<IEnumerable<IntLegalizacionTransportadoresDTO>>> getByFechaAsync(DateOnly desde, DateOnly hasta , int id)
        {
            if(desde == default)return ServiceResponse<IEnumerable<IntLegalizacionTransportadoresDTO>>.Error(Messages.InvalidParameter + "Fecha desde");
            if(hasta ==default )return ServiceResponse<IEnumerable<IntLegalizacionTransportadoresDTO>>.Error(Messages.InvalidParameter + "Fecha hasta");
            if(desde> hasta) return ServiceResponse<IEnumerable<IntLegalizacionTransportadoresDTO>>
            .Error(Messages.InvalidParameter + "La fecha desde no puede ser mayor que la fecha hasta.");
            var lista = await _repo.GetByFecha(desde, hasta,id);
            if(!lista.Any()){
                return ServiceResponse<IEnumerable<IntLegalizacionTransportadoresDTO>>.Error(Messages.NotFound);
            }
            var dto = _maper.Map<IEnumerable<IntLegalizacionTransportadoresDTO>>(lista);
            return ServiceResponse<IEnumerable<IntLegalizacionTransportadoresDTO>>.Ok(dto,Messages.SuccessfulChanged);
        }

        public async Task<ServiceResponse<IntLegalizacionTransportadoresDTO>>getByIdAsync(int id)
        {
            if(id < 0) return ServiceResponse<IntLegalizacionTransportadoresDTO>.Error(Messages.InvalidParameter + "Id Invalido");
            var entity = await _repo.GetById(id);
            if (entity == null)
                return ServiceResponse<IntLegalizacionTransportadoresDTO>.Error(Messages.NotFound);
            var dto = _maper.Map<IntLegalizacionTransportadoresDTO>(entity);
            return ServiceResponse<IntLegalizacionTransportadoresDTO>.Ok(dto, Messages.SuccessfulChanged);
        }

        public async Task<ServiceResponse<IntLegalizacionTransportadoresDTO>>createLegalizacionAsync(CreateIntLegalizacionTransportadoresDTO data)
        {
            if(!ServiceValidate.ValidateRequired(data)) return ServiceResponse<IntLegalizacionTransportadoresDTO>.Error(Messages.InvalidParameter);
            var entity = _maper.Map<IntLegalizacionTransportadores>(data);
            await _repo.CreateLegalizacion(entity);
            var dto = _maper.Map<IntLegalizacionTransportadoresDTO>(entity);
            return ServiceResponse<IntLegalizacionTransportadoresDTO>.Ok(dto,Messages.Created);
        }

        public async Task<ServiceResponse<IntLegalizacionTransportadoresDTO>>updateLegalizacionAsync(UpdateIntLegalizacionTransportadoresDTO data)
        {
            if(data.LegalizacionID <=0) return ServiceResponse<IntLegalizacionTransportadoresDTO>.Error(Messages.InvalidParameter + "Id Invalido");
            if(!ServiceValidate.ValidateRequired(data)) return ServiceResponse<IntLegalizacionTransportadoresDTO>.Error(Messages.InvalidParameter );
            var entity = await _repo.GetById(data.LegalizacionID);
            if(entity== null)return ServiceResponse<IntLegalizacionTransportadoresDTO>.Error(Messages.NotFound);
            _maper.Map(data,entity);
            await _repo.UpdateLegalizacion(entity);
            var dto =_maper.Map<IntLegalizacionTransportadoresDTO>(entity);
            return ServiceResponse<IntLegalizacionTransportadoresDTO>.Ok(dto, Messages.Updated);
        }

        public async Task<ServiceResponse<bool>>deleteLegalizacionAsync(int id)
        {
            if(id<=0) return ServiceResponse<bool>.Error(Messages.InvalidParameter);
            var deleted = await _repo.DeleteLegalizacion(id);
            if (!deleted)
                return ServiceResponse<bool>.Error(Messages.NotFound);
            return ServiceResponse<bool>.Ok(true, Messages.Deleted);
        }
    }
}