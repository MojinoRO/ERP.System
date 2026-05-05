using System.Dynamic;
using ERP.Application.DTOs;
using ERP.Application.Interfaces;
using ERP.Domain.Interfaces;

namespace ERP.Application.Services
{
    public class ConfSubCategoriasService : IConfSubCategoriasService
    {
        private readonly IConfSubCategoriasRepository _repo;
        public ConfSubCategoriasService(IConfSubCategoriasRepository reposotory) => _repo= reposotory;

        public async Task<IEnumerable<ConfSubCategeriasDTOs>> getAllAsync()
        {
            var sb = await _repo.getAllAsync();
            return sb.Select(sb => new ConfSubCategeriasDTOs
            {
                SubCategoriasID=sb.SubCategoriaID,
                CategoriaID=sb.CategoriaID,
                SubCategoriaCodigo=sb.SubCategoriaCodigo,
                SubCategoriasCodigo=sb.SubCategoriaNombre
            });
        }
    }
}