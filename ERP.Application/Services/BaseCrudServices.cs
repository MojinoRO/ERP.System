using System.Reflection.Metadata.Ecma335;
using AutoMapper;
using ERP.Application.common;
using ERP.Application.Interfaces;
using ERP.Application.Mapping;
using ERP.Domain.Interfaces;
namespace ERP.Application.Services
{
    public abstract class BaseCrudService<TEntity , TDto,TCreateDto, TUpdateDto ,TKey> 
        : IBaseCrudServices<TDto ,TCreateDto , TUpdateDto , TKey> where TEntity : class
    {
        protected readonly IBaseCrudRepository<TEntity , TKey> _repo;
        protected readonly IMapper _mapper;

        protected BaseCrudService(IBaseCrudRepository<TEntity , TKey> repo , IMapper mapper)
        {
            _repo = repo;
            _mapper=mapper;
        }

        public virtual async Task<ServiceResponse<IEnumerable<TDto>>> GetAllAsync()
        {
            var list = await _repo.GetAllAsync();
            if(!list.Any()) 
                return ServiceResponse<IEnumerable<TDto>>.Error(Messages.NotFound);
            return ServiceResponse<IEnumerable<TDto>>.Ok(_mapper.Map<IEnumerable<TDto>>(list), Messages.SuccessfulChanged);
        }

        public virtual async Task<ServiceResponse<TDto>>GetByIdAsync(TKey id)
        {
            var entity = await _repo.GetByIDAsync(id);
            if(entity == null)
                return ServiceResponse<TDto>.Error(Messages.NotFound);
            return ServiceResponse<TDto>.Ok(_mapper.Map<TDto>(entity), Messages.SuccessfulChanged);
        }

        public virtual async Task<ServiceResponse<TDto>> CreateAsync(TCreateDto data)
        {
            if (!ServiceValidate.ValidateRequired(data!))
                return ServiceResponse<TDto>.Error(Messages.InvalidParameter);
            var entity = _mapper.Map<TEntity>(data);
            await _repo.CreateAsync(entity);
            return ServiceResponse<TDto>.Ok(_mapper.Map<TDto>(entity), Messages.Created);
        }

        public virtual async Task<ServiceResponse<TDto>> UpdateAsync(TKey id, TUpdateDto data)
        {
            if (!ServiceValidate.ValidateRequired(data!))
                return ServiceResponse<TDto>.Error(Messages.InvalidParameter);
            var entity = await _repo.GetByIDAsync(id);
            if (entity == null)
                return ServiceResponse<TDto>.Error(Messages.NotFound);
            _mapper.Map(data, entity);
            await _repo.UpdateAsync(entity);
            return ServiceResponse<TDto>.Ok(_mapper.Map<TDto>(entity), Messages.Updated);
        }

        public virtual async Task<ServiceResponse<bool>> DeleteAsync(TKey id)
        {
            var deleted = await _repo.DeleteAsync(id);
            if (!deleted)
                return ServiceResponse<bool>.Error(Messages.NotFound);
            return ServiceResponse<bool>.Ok(true, Messages.Deleted);
        }
    }
}