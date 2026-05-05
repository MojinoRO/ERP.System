using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ERP.Domain.Entities
{
    public class ConfSubCategorias
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SubCategoriaID {get;set;}

        //fk
        public int CategoriaID { get;set;}

        [Required]
        public string SubCategoriaCodigo {get; set;}= null!;
        [Required]
        public string SubCategoriaNombre {get;set;}=null!;

        //propiedad de navegacion sobre confcategorias
        public ConfCategorias ConfCategorias {get ; set;}=null!;

    }
}