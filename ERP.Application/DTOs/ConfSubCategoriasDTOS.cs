namespace ERP.Application.DTOs
{
    public class ConfSubCategeriasDTOs
    {
        public int SubCategoriasID{get;set;}
        public int CategoriaID{get; set;}
        public string SubCategoriaCodigo{get;set;}=string.Empty;
        public string SubCategoriasCodigo{get;set;}=string.Empty;
        public string CategoriasCodigo{get;set;}=string.Empty;
        public string CategoriasNombre{get;set;}=string.Empty;
    }
    public class CreateSubCategeriasDTOs
    {
        public int SubCategoriasID{get;set;}
        public int CategoriaID{get; set;}
        public string SubCategoriaCodigo{get;set;}=string.Empty;
        public string SubCategoriasCodigo{get;set;}=string.Empty;
    }
    public class UpdateSubCategeriasDTOs
    {
        public int SubCategoriasID{get;set;}
        public int CategoriaID{get; set;}
        public string SubCategoriaCodigo{get;set;}=string.Empty;
        public string SubCategoriasCodigo{get;set;}=string.Empty;
    }
}