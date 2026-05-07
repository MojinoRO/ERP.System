using System.ComponentModel.DataAnnotations;

namespace ERP.Application.DTOs
{
    public class ConfSubCategeriasDTOs
    {
        public int SubCategoriaID{get;set;}
        public int CategoriaID{get; set;}
        public string SubCategoriaCodigo{get;set;}=string.Empty;
        public string SubCategoriaNombre{get;set;}=string.Empty;
        public int Estado {get; set;}
    }
    public class CreateSubCategeriasDTOs
    {
        public int SubCategoriasID{get;set;}
        [Required]
        public int CategoriaID{get; set;}

        [Required(ErrorMessage ="Codigo Obligatorio")]
        [StringLength(3,ErrorMessage ="Codigo no mayor a 3 digitos")]
        public string SubCategoriaCodigo{get;set;}=string.Empty;

        [Required(ErrorMessage ="Nombre Obligatorio")]
        [StringLength(150,ErrorMessage ="Nombre desbordado")]
        public string SubCategoriaNombre{get;set;}=string.Empty;
        
        public int Estado {get; set;}
    }
    public class UpdateSubCategeriasDTOs
    {
        public int SubCategoriasID{get;set;}
        public int CategoriaID{get; set;}

        [Required(ErrorMessage ="Codigo Obligatorio")]
        [StringLength(3,ErrorMessage ="Codigo no mayor a 3 digitos")]
        public string SubCategoriaCodigo{get;set;}=string.Empty;
        
        [Required(ErrorMessage ="Nombre Obligatorio")]
        [StringLength(150,ErrorMessage ="Nombre desbordado")]
        public string SubCategoriaNombre{get;set;}=string.Empty;
        
        public int Estado {get; set;}
    }
}