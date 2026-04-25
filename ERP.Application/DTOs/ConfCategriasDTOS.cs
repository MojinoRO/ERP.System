namespace ERP.Application.DTOs
{
    public class ConfCategoriasDto
    {
        public int CategoriaID{get;set;}
        public string CategoriaCodigo{get;set;}=string.Empty;
        public string CategoriaNombre{get;set;}=string.Empty;
        public int  ImpuestoACargo{get;set;}
        public int TarifaImpuesto{get; set;}
        public int Estado{get; set;}
    }
    public class CreateConfCategorias
    {
        public int CategoriaID{get;set;}
        public string CategoriaCodigo{get;set;}=string.Empty;
        public string CategoriaNombre{get;set;}=string.Empty;
        public int  ImpuestoACargo{get;set;}
        public int TarifaImpuesto{get; set;}
        public int Estado{get; set;}
    }
    public class UpdateConfCategoriasDto
    {
        public int CategoriaID{get;set;}
        public string CategoriaCodigo{get;set;}=string.Empty;
        public string CategoriaNombre{get;set;}=string.Empty;
        public int  ImpuestoACargo{get;set;}
        public int TarifaImpuesto{get; set;}
        public int Estado{get; set;}
    }

}