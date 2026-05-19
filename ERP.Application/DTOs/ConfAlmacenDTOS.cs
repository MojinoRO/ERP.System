using System.ComponentModel.DataAnnotations;

namespace ERP.Application.DTOs
{
    public class ConfAlmacenDTO
    {
        public int AlmacenID{get;set;}
        public string AlmacenCodigo {get;set;}=string.Empty;
        public string AlmacenNombre {get;set;}=string.Empty;
        public int Estado {get;set;}
    }
    public class CreateConfAlmacenDTO
    {
        public int AlmacenID{get;set;}

        [Required(ErrorMessage ="Codigo Obligatorio")]
        [MaxLength(3,ErrorMessage ="Codigo debe ser de 3 digitos")]
        public string AlmacenCodigo {get;set;}=string.Empty;

        [Required(ErrorMessage ="Nombre Obligatorio")]
        [MaxLength(150,ErrorMessage ="Nombre muy largo")] 
        public string AlmacenNombre {get;set;}=string.Empty;

        [Required]
        public int Estado {get;set;}
    }
    public class UpdateConfAlmacenDTO
    {
        public int AlmacenID{get;set;}

        [Required(ErrorMessage ="Codigo Obligatorio")]
        [MaxLength(3,ErrorMessage ="Codigo debe ser de 3 digitos")]
        public string AlmacenCodigo {get;set;}=string.Empty;

        [Required(ErrorMessage ="Nombre Obligatorio")]
        [MaxLength(150,ErrorMessage ="Nombre muy largo")] 
        public string AlmacenNombre {get;set;}=string.Empty;

        [Required]
        public int Estado {get;set;}
    }
}