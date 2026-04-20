using System.Runtime.CompilerServices;

namespace ERP.Application.DTOs
{
    public class ConfVendedoresDTO
    {
        public int VendedorID{get;set;}
        public string VendedorCodigo{get;set;}=string.Empty;
        public string VendedorIdentificacion{get;set;}=string.Empty;
        public string VendedorNombre{get;set;}=string.Empty;
        public int VendedorEstado{get; set;}
    }
    public class CreateConfVendedoresDTO
    {
        public int VendedorID{get;set;}
        public string VendedorCodigo{get;set;}=string.Empty;
        public string VendedorIdentificacion{get;set;}=string.Empty;
        public string VendedorNombre{get;set;}=string.Empty;
        public int VendedorEstado{get; set;}
    }
    public class UpdateConfVendedoresDTO
    {
        public int VendedorID{get;set;}
        public string VendedorCodigo{get;set;}=string.Empty;
        public string VendedorIdentificacion{get;set;}=string.Empty;
        public string VendedorNombre{get;set;}=string.Empty;
        public int VendedorEstado{get; set;}
    }

    public class DeleteConfVendedoresDTO
    {
        public int VendedorID{get; set;}
    }
}
