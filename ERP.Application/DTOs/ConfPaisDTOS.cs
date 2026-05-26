using System.ComponentModel.DataAnnotations;

namespace ERP.Application.DTOs
{
    public class ConfPaisDto
    {
        public int PaisID {get;set;}
        public string CodigoPais {get;set;}=string.Empty;
        public string NombrePais {get;set;}=string.Empty;
        public string CodigoAlfa{get;set;}=string.Empty;
    }
    public class CreateConfPaisDtos
    {

        [Required]
        [MaxLength(4,ErrorMessage ="Codigo No puede ser Mayor a 4 digitos")]
        public string CodigoPais {get;set;}=string.Empty;

        [Required]
        [MaxLength(150,ErrorMessage ="Nombre Muy largo")]
        public string NombrePais {get;set;}=string.Empty;

        [Required]
        [MaxLength(3,ErrorMessage ="Codigo No puede ser Mayor a 4 digitos")]
        public string CodigoAlfa{get;set;}=string.Empty;
    }

    public class UpdateConfPaisDtos
    {
        [Required]
        public int PaisID {get;set;}

        [Required]
        [MaxLength(4,ErrorMessage ="Codigo No puede ser Mayor a 4 digitos")]
        public string CodigoPais {get;set;}=string.Empty;

        [Required]
        [MaxLength(150,ErrorMessage ="Nombre Muy largo")]
        public string NombrePais {get;set;}=string.Empty;

        [Required]
        [MaxLength(3,ErrorMessage ="Codigo No puede ser Mayor a 4 digitos")]
        public string CodigoAlfa{get;set;}=string.Empty;
    }

}