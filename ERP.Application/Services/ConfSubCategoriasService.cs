using ERP.Application.DTOs;
using ERP.Application.Interfaces;
using ERP.Domain.Interfaces;

namespace ERP.Application.Services
{
    public class ConfSubCategoriasService : IConfSubCategoriasService
    {
        private readonly IConfSubCategoriasRepository _repo 
        public ConfSubCategoriasService(IConfSubCategoriasRepository reposotory) => _repo= reposotory;

        public async Task<IEnumerable<ConfSubCategeriasDTOs>>
    }
}