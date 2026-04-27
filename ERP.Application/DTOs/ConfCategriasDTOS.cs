using System.ComponentModel.DataAnnotations;

namespace ERP.Application.DTOs
{
    public class ConfCategoriasDto
    {
        public int CategoriaID { get; set; }

        public string CategoriaCodigo { get; set; } = string.Empty;

        public string CategoriaNombre { get; set; } = string.Empty;

        public int ImpuestoACargo { get; set; }

        public decimal TarifaImpuesto { get; set; }

        public int Estado { get; set; }
    }

    public class CreateConfCategoriasDto
    {
        [Required(ErrorMessage = "El código es obligatorio")]
        [StringLength(20, ErrorMessage = "Máximo 20 caracteres")]
        public string CategoriaCodigo { get; set; } = string.Empty;

        [Required(ErrorMessage = "El nombre es obligatorio")]
        [StringLength(100, ErrorMessage = "Máximo 100 caracteres")]
        public string CategoriaNombre { get; set; } = string.Empty;

        [Range(0, 1, ErrorMessage = "Impuesto inválido")]
        public int ImpuestoACargo { get; set; }

        [Range(0, 100, ErrorMessage = "Tarifa debe estar entre 0 y 100")]
        public decimal TarifaImpuesto { get; set; }

        [Range(0, 1, ErrorMessage = "Estado inválido")]
        public int Estado { get; set; }
    }

    public class UpdateConfCategoriasDto
    {

        [Required(ErrorMessage = "El código es obligatorio")]
        [StringLength(20)]
        public string CategoriaCodigo { get; set; } = string.Empty;

        [Required(ErrorMessage = "El nombre es obligatorio")]
        [StringLength(100)]
        public string CategoriaNombre { get; set; } = string.Empty;

        [Range(0, 1)]
        public int ImpuestoACargo { get; set; }

        [Range(0, 100)]
        public decimal TarifaImpuesto { get; set; }

        [Range(0, 1)]
        public int Estado { get; set; }
    }
}