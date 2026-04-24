using System.ComponentModel;
using System.Net.Http.Headers;
using System.Runtime.CompilerServices;
using ERP.Application.DTOs;
using ERP.Application.Interfaces;
using ERP.Domain.Entities;
using ERP.Domain.Interfaces;

namespace ERP.Application.Services
{
    public class ConfVendedoresService : IConfVendedoresServices
    {
        private readonly IConfVendedoresRepository _repository;
        public ConfVendedoresService(IConfVendedoresRepository repository)=>_repository=repository;

        public async Task<IEnumerable<ConfVendedoresDTO>> GetALLAsync()
        {
           var Vendedores = await _repository.GetAllAsync();
           return Vendedores.Select(u => new ConfVendedoresDTO
           {
               VendedorID=u.VendedorID,
               VendedorCodigo=u.CodigoVendedor,
               VendedorIdentificacion=u.VendedorIdentificacion,
               VendedorNombre=u.VendedorNombre,
               VendedorEstado=u.VendedorEstado
           });
        }


        public async Task<ConfVendedoresDTO?>GetByIdAsync(int id)
        {
            var Vendedor = await _repository.GetById(id);
            if(Vendedor == null)return null;
            return new ConfVendedoresDTO
            {
                VendedorID= Vendedor.VendedorID,
                VendedorCodigo = Vendedor.CodigoVendedor,
                VendedorIdentificacion= Vendedor.VendedorIdentificacion,
                VendedorNombre= Vendedor.VendedorNombre,
                VendedorEstado= Vendedor.VendedorEstado
            };
        }

        public async Task<ConfVendedoresDTO>CreateAsync(CreateConfVendedoresDTO dto)
        {
            if(string.IsNullOrEmpty(dto.VendedorCodigo))
                throw new ArgumentException("Codigo de vendedor vacio");
            if(string.IsNullOrEmpty(dto.VendedorIdentificacion))
                throw new ArgumentException("identificacion vacia");
            if(string.IsNullOrEmpty(dto.VendedorNombre))
                throw new ArgumentException("Nombre de vendedor es obligatorio");

            var existe = await _repository.GetByCodigoAsync(dto.VendedorCodigo);
            if(existe != null)
                throw new ArgumentException("Usuario Ya Existe");
            
            var NewVendedor = new ConfVendedores
            {
                CodigoVendedor= dto.VendedorCodigo,
                VendedorIdentificacion=dto.VendedorIdentificacion,
                VendedorNombre=dto.VendedorNombre,
                VendedorEstado=dto.VendedorEstado
            };

            await _repository.CreateAsync(NewVendedor);

            return new ConfVendedoresDTO
            {
                VendedorCodigo=NewVendedor.CodigoVendedor,
                VendedorIdentificacion=NewVendedor.VendedorIdentificacion,
                VendedorNombre=NewVendedor.VendedorNombre,
                VendedorEstado=NewVendedor.VendedorEstado,
            };
        }

        public async Task<ConfVendedoresDTO>UpdateAsyc(int id , UpdateConfVendedoresDTO dto)
        {
            if(string.IsNullOrEmpty(dto.VendedorCodigo))
                throw new ArgumentException("Codigo de vendedor vacio");
            if(string.IsNullOrEmpty(dto.VendedorIdentificacion))
                throw new ArgumentException("identificacion vacia");
            if(string.IsNullOrEmpty(dto.VendedorNombre))
                throw new ArgumentException("Nombre de vendedor es obligatorio");
            
            var ven = await _repository.GetById(id);
            if(ven == null)
                throw new ArgumentException("VendedorID no existe");

            ven!.CodigoVendedor=dto.VendedorCodigo;
            ven.VendedorIdentificacion=dto.VendedorIdentificacion;
            ven.VendedorNombre=dto.VendedorNombre;
            ven.VendedorEstado=dto.VendedorEstado;

            var update = await _repository.UPdateAsync(ven);
            return new ConfVendedoresDTO
            {
                VendedorCodigo= update.CodigoVendedor,
                VendedorIdentificacion=update.VendedorIdentificacion,
                VendedorNombre=update.VendedorNombre,
                VendedorEstado=update.VendedorEstado,
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}