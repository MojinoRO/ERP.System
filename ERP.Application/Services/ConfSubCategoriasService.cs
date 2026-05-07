using ERP.Application.DTOs;
using ERP.Application.Interfaces;
using ERP.Domain.Entities;
using ERP.Domain.Interfaces;
using AutoMapper;
using System.Dynamic;

namespace ERP.Application.Services
{
    public class ConfSubCategoriasService : IConfSubCategoriasService
    {
        private readonly IConfSubCategoriasRepository _repo;
        private readonly IMapper _mapper;
        public ConfSubCategoriasService(IConfSubCategoriasRepository reposotory ,IMapper mapping)
        {
            _repo= reposotory;
            _mapper= mapping;
        }

        public async Task<IEnumerable<ConfSubCategeriasDTOs>> getAllAsync()
        {
            var sb = await _repo.getAllAsync();
            return _mapper.Map<IEnumerable<ConfSubCategeriasDTOs>>(sb);
        }

        public async Task<ConfSubCategeriasDTOs?>getByIDAsync(int id)
        {
            var sb = await _repo.getByIDAsync(id);
            if(sb == null)return null;
            return _mapper.Map<ConfSubCategeriasDTOs>(sb);
        }

        public async Task<ConfSubCategeriasDTOs?>getByCodigoAsync(string codigo)
        {
            var sb = await _repo.getByCodigoAsync(codigo);
            if(sb == null)return null;
            return _mapper.Map<ConfSubCategeriasDTOs>(sb);
        }
        
        public async Task<ConfSubCategeriasDTOs?>getByCategoriaID(int id)
        {
            var sb = await _repo.getByCategoriaID(id);
            if(sb == null)return null;
            return _mapper.Map<ConfSubCategeriasDTOs>(sb);
        }

        public async Task<ConfSubCategeriasDTOs>CreateSubCategoriasAsync(CreateSubCategeriasDTOs subcategoria)
        {
            if(subcategoria == null)
                throw new ArgumentException(nameof(subcategoria));
            if(string.IsNullOrWhiteSpace(subcategoria.SubCategoriaCodigo) ||
                string.IsNullOrWhiteSpace(subcategoria.SubCategoriaNombre))
                    throw new ArgumentException(" codigo o nombre en blanco debe validar");
            var existe= await _repo.getByCodigoAsync(subcategoria.SubCategoriaCodigo);
            if(existe != null)
                throw new ArgumentException("Codigo de subcategoria ya exuste");
            var sb = _mapper.Map<ConfSubCategorias>(subcategoria);
            await _repo.CreateSubCategoriasAsync(sb);
            return _mapper.Map<ConfSubCategeriasDTOs>(sb);
        }

        public async Task <ConfSubCategeriasDTOs>UpdateSubCategoriasAsync(UpdateSubCategeriasDTOs subcategoria)
        {
            if(subcategoria == null)
                throw new ArgumentException(nameof(subcategoria));

            var request = await _repo.getByIDAsync(subcategoria.SubCategoriasID);
            if(request == null)
                throw new ArgumentException("Subcategoria No Existe en la base de datos");


            if(string.IsNullOrEmpty(subcategoria.SubCategoriaCodigo) || string.IsNullOrEmpty(subcategoria.SubCategoriaNombre))
                throw new ArgumentException(" codigo o nombre en blanco debe validar");

            var existe= await _repo.getByCodigoAsync(subcategoria.SubCategoriaCodigo);
            if(existe != null && existe.SubCategoriaID != subcategoria.SubCategoriasID)
                throw new ArgumentException("Codigo de subcategoria ya exuste");

            _mapper.Map(subcategoria,request);

            await _repo.UpdateSubCategoriasAsync(request);
            return _mapper.Map<ConfSubCategeriasDTOs>(request);
        }

        public async Task<bool> deleteSubCategoriasAsync(int id)
        {
            var request = await _repo.getByIDAsync(id);
            if(request == null) return false;
            return await _repo.deleteSubCategoriasAsync(id);
        }

    }
}