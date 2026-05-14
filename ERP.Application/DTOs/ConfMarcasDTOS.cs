using System.ComponentModel.DataAnnotations;

namespace ERP.Application.DTOs
{
    public class ConfMarcasDto
    {

        public int MarcaID{get;set;}
        public string CodigoMarca{get;set;}=string.Empty;
        public string MarcaNombre{get;set;}=string.Empty;
        public int Estado{get;set;}
    }

    public class CreateConfMarcasDto
    {
        [Required]
        public int MarcaID{get;set;}

        [Required]
        [MaxLength(3,ErrorMessage ="Codigo Debe ser de 3 digitos")]
        public string CodigoMarca{get;set;}=string.Empty;
        
        [Required]
        [MaxLength(150,ErrorMessage ="Nombre Muy Largo")]
        public string MarcaNombre{get;set;}=string.Empty;

        [Required]
        public int Estado{get;set;}
    }
    public class UpdateConfMarcasDto
    {
        [Required]
        public int MarcaID{get;set;}

        [Required]
        [MaxLength(3,ErrorMessage ="Codigo Debe ser de 3 digitos")]
        public string CodigoMarca{get;set;}=string.Empty;
        
        [Required]
        [MaxLength(150,ErrorMessage ="Nombre Muy Largo")]
        public string MarcaNombre{get;set;}=string.Empty;

        [Required]
        public int Estado{get;set;}
    }
}