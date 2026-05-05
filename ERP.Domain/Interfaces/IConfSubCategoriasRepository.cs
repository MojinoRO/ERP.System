using ERP.Domain.Entities;

namespace ERP.Domain.Interfaces
{
    public interface IConfSubCategoriasRepository
    {
        Task<IEnumerable<ConfSubCategorias>>getAllAsync();
        Task<ConfSubCategorias?>getByIDAsync(int id);
        Task<ConfSubCategorias?>getByCodigoAsync(string codigo);
        Task<ConfSubCategorias?>getByCategoriaID(int CategoriaID);
        Task<ConfSubCategorias>CreateSubCategoriasAsync(ConfSubCategorias subCategorias);
        Task<ConfSubCategorias>UpdateSubCategoriasAsync(ConfSubCategorias subCategorias);
        Task<bool>deleteSubCategoriasAsync(int id);
    }

}