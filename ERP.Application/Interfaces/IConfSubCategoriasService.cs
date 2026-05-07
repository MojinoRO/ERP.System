using ERP.Application.DTOs;

namespace ERP.Application.Interfaces
{
    public interface IConfSubCategoriasService
    {
        Task<IEnumerable<ConfSubCategeriasDTOs>>getAllAsync();
        Task<ConfSubCategeriasDTOs?>getByIDAsync(int id);
        Task<ConfSubCategeriasDTOs?>getByCodigoAsync(string codigo);
        Task<ConfSubCategeriasDTOs?>getByCategoriaID(int CategoriaID);
        Task<ConfSubCategeriasDTOs>CreateSubCategoriasAsync(CreateSubCategeriasDTOs subCategorias);
        Task<ConfSubCategeriasDTOs>UpdateSubCategoriasAsync(UpdateSubCategeriasDTOs subCategorias);
        Task<bool>deleteSubCategoriasAsync(int id);
    }
}