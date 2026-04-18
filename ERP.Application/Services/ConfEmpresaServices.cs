using System.Diagnostics;
using System.Net.Http.Headers;
using ERP.Application.DTOs;
using ERP.Application.Interfaces;
using ERP.Domain.Interfaces;

namespace ERP.Application.Services
{
    public class ConfEmpresaService : IConfEmpresaService
    {
        private readonly IConfEmpresaRepository _repository;
        public ConfEmpresaService(IConfEmpresaRepository repository)=>_repository=repository;

        public async Task<IEnumerable<ConfEmpresaDTO>> GetAllAsync()
        {
            var Empresa = await _repository.GetAllAsync();
            if(Empresa == null)
                throw new ArgumentException("No hay datos de empresa");
            
            return Empresa.Select(e => new ConfEmpresaDTO
            {
               EmpresaID= e.EmpresaID,
               EmpresaNit=e.EmpresaNit,
               EmpresaDV=e.EmpresaDV,
               EmpresaNombre=e.EmpresaNombre,
               EmpresaRazonSocial=e.EmpresaRazonSocial,
               EmpresaRepresentanteLegal=e.EmpresaRepresentanteLegal,
               EmpresaDireccion=e.EmpresaDireccion,
               EmpresaTelefono=e.EmpresaTelefono,
               EmpresaEmail=e.EmpresaEmail,
               EmpresaKeyLicencia=e.EmpresaKeyLicencia
            });
        }

        public async Task<ConfEmpresaDTO?>GetByIdAsync(int id)
        {
            var e = await _repository.GetByIDAsync(id);
            if(e == null) return null;
            return new ConfEmpresaDTO
            {
               EmpresaID= e.EmpresaID,
               EmpresaNit=e.EmpresaNit,
               EmpresaDV=e.EmpresaDV,
               EmpresaNombre=e.EmpresaNombre,
               EmpresaRazonSocial=e.EmpresaRazonSocial,
               EmpresaRepresentanteLegal=e.EmpresaRepresentanteLegal,
               EmpresaDireccion=e.EmpresaDireccion,
               EmpresaTelefono=e.EmpresaTelefono,
               EmpresaEmail=e.EmpresaEmail,
               EmpresaKeyLicencia=e.EmpresaKeyLicencia
            };
        }

        public async Task<ConfEmpresaDTO>CreateEmpresaAsync(CreateConfEmpresaDto dto)
        {
            if(dto == null)
                throw new ArgumentException("DatosIncompletos");
            if(string.IsNullOrEmpty(dto.EmpresaNit))
                throw new ArgumentException("El Campo Nit es requerido");
            if(string.IsNullOrEmpty(dto.EmpresaNombre))
                throw new ArgumentException("El Nombre Razon social es obligatorio");
            if(string.IsNullOrEmpty(dto.EmpresaRazonSocial))
                throw new ArgumentException("El Nombre representante Legal es obligatorio");
             if(string.IsNullOrEmpty(dto.EmpresaDireccion))
                throw new ArgumentException("Direccion Obligatoria");   
            if(string.IsNullOrEmpty(dto.EmpresaTelefono))
                throw new ArgumentException("El Telefono es obligatorio");
            if(string.IsNullOrEmpty(dto.EmpresaEmail))
                throw new ArgumentException("El Email es obligatorio");
            if(string.IsNullOrEmpty(dto.EmpresaKeyLicencia))
                throw new ArgumentException("El key Empresa obligatorio");

            var empresa = new ConfEmpresa
            {
                EmpresaID=dto.EmpresaID,
                EmpresaNit=dto.EmpresaNit,
                EmpresaDV=dto.EmpresaDV,
                EmpresaNombre=dto.EmpresaNombre,
                EmpresaRazonSocial=dto.EmpresaRazonSocial,
                EmpresaRepresentanteLegal=dto.EmpresaRepresentanteLegal,
                EmpresaDireccion=dto.EmpresaRepresentanteLegal,
                EmpresaTelefono=dto.EmpresaTelefono,
                EmpresaEmail=dto.EmpresaEmail,
                EmpresaKeyLicencia=dto.EmpresaKeyLicencia
            };

            var creada =await _repository.CreateEmpresaAsync(empresa);
            return new ConfEmpresaDTO
            {
                EmpresaID=creada.EmpresaID,
                EmpresaNit=creada.EmpresaNit,
                EmpresaDV=creada.EmpresaDV,
                EmpresaNombre=creada.EmpresaNombre,
                EmpresaRazonSocial=creada.EmpresaRazonSocial,
                EmpresaRepresentanteLegal=creada.EmpresaRepresentanteLegal,
                EmpresaDireccion=creada.EmpresaRepresentanteLegal,
                EmpresaTelefono=creada.EmpresaTelefono,
                EmpresaEmail=creada.EmpresaEmail,
                EmpresaKeyLicencia=creada.EmpresaKeyLicencia
            };
        }

        public async Task<ConfEmpresaDTO>UpdateEmpresaAsync(int id, UpdateConfEmpresaDto dto)
        {
            if(dto == null)
                throw new ArgumentException("DatosIncompletos");
            if(string.IsNullOrEmpty(dto.EmpresaNit))
                throw new ArgumentException("El Campo Nit es requerido");
            if(string.IsNullOrEmpty(dto.EmpresaNombre))
                throw new ArgumentException("El Nombre Razon social es obligatorio");
            if(string.IsNullOrEmpty(dto.EmpresaRazonSocial))
                throw new ArgumentException("El Nombre representante Legal es obligatorio");
             if(string.IsNullOrEmpty(dto.EmpresaDireccion))
                throw new ArgumentException("Direccion Obligatoria");   
            if(string.IsNullOrEmpty(dto.EmpresaTelefono))
                throw new ArgumentException("El Telefono es obligatorio");
            if(string.IsNullOrEmpty(dto.EmpresaEmail))
                throw new ArgumentException("El Email es obligatorio");
            if(string.IsNullOrEmpty(dto.EmpresaKeyLicencia))
                throw new ArgumentException("El key Empresa obligatorio");

            var u = await _repository.GetByIDAsync(id);
            if(u == null) throw new ArgumentException("Empresa No Existe en la base de datos");
            u.EmpresaNit=dto.EmpresaNit;
            u.EmpresaDV=dto.EmpresaDV;
            u.EmpresaNombre=dto.EmpresaNombre;
            u.EmpresaRazonSocial=dto.EmpresaRazonSocial;
            u.EmpresaRepresentanteLegal=dto.EmpresaRepresentanteLegal;
            u.EmpresaDireccion=dto.EmpresaDireccion;
            u.EmpresaTelefono=dto.EmpresaTelefono;
            u.EmpresaEmail=dto.EmpresaEmail;
            u.EmpresaKeyLicencia=dto.EmpresaKeyLicencia;

            var updateEmpresa = await _repository.UpdateEmpresaAsync(u);
            return new ConfEmpresaDTO
            {
                EmpresaID=updateEmpresa.EmpresaID,
                EmpresaNit=updateEmpresa.EmpresaNit,
                EmpresaDV=updateEmpresa.EmpresaDV,
                EmpresaNombre=updateEmpresa.EmpresaNombre,
                EmpresaRazonSocial=updateEmpresa.EmpresaRazonSocial,
                EmpresaRepresentanteLegal=updateEmpresa.EmpresaRepresentanteLegal,
                EmpresaDireccion=updateEmpresa.EmpresaRepresentanteLegal,
                EmpresaTelefono=updateEmpresa.EmpresaTelefono,
                EmpresaEmail=updateEmpresa.EmpresaEmail,
                EmpresaKeyLicencia=updateEmpresa.EmpresaKeyLicencia               
            };
        }
    }
}