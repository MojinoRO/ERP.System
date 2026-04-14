using ERP.Application.interfaces;
using ERP.Domain.interfaces;
using ERP.Domain.Entities;
using System.Runtime.CompilerServices;
using ERP.Application.DTOs;

namespace ERP.Application.Services;

public class ConfEmpresaService : IConfEmpresaService
{
    private readonly IConfEmpresaRepository _repository;
    // Recibe el repositorio inyectado — no sabe si es SQL Server o PostgreSQL
    public ConfEmpresaService (IConfEmpresaRepository repository) => _repository=repository;

    public async Task<IEnumerable<ConfEmpresaResponseDTO>> GetAllAsync()
    {
        var empresas = await _repository.GetAllAsync();
        return empresas.Select(ConfEmpresaMapper.ToDto);
    }

    public async Task<ConfEmpresaResponseDTO>CreateAsync(CreateConfEmpresaDTO dto)
    {
        if(string.IsNullOrWhiteSpace(dto.EmpresaNit))
            throw new Exception ("El nit es obligatorio");
        if(string.IsNullOrEmpty(dto.EmpresaNombre))
            throw new Exception("El nombre empresa es obligatorio");
        if(string.IsNullOrEmpty(dto.EmpresaRazonSocial))
            throw new Exception("El razon social  es obligatorio");
        
        var empresa = new ConfEmpresa
        {
            EmpresaNit= dto.EmpresaNit,
            EmpresaDV= dto.EmpresaDV,
            EmpresaNombre= dto.EmpresaNombre,
            EmpresaRazonSocial= dto.EmpresaRazonSocial,
            EmpresaRepresentanteLegal= dto.EmpresaRepresentanteLegal,
            EmpresaDireccion= dto.EmpresaDireccion,
            EmpresaTelefono=dto.EmpresaTelefono,
            EmpresaEmail=dto.EmpresaEmail,
            EmpresaKeyLicencia=dto.EmpresaKeyLicencia
        };

        await _repository.CreateAsync    (empresa);
        var respo = new ConfEmpresaResponseDTO
        {
            EmpresaNit= empresa.EmpresaNit,
            EmpresaDV= empresa.EmpresaDV,
            EmpresaNombre=empresa.EmpresaNombre,
            EmpresaRazonSocial=empresa.EmpresaRazonSocial,
            EmpresaRepresentanteLegal= empresa.EmpresaRazonSocial,
            EmpresaDireccion=empresa.EmpresaDireccion,
            EmpresaTelefono=empresa.EmpresaTelefono,
            EmpresaEmail=empresa.EmpresaEmail,
            EmpresaKeyLicencia=empresa.EmpresaKeyLicencia
        };

        return respo;

    }

    public async Task<ConfEmpresaResponseDTO?>UpdateAsync(UpdateConfEmpresaDTO dto)
    {
       var entidad = ConfEmpresaMapper.ToEntity(dto);
       var actualizada = await _repository.UpdateAsync(entidad);
       if(actualizada ==null)return null;
       return ConfEmpresaMapper.ToDto(actualizada);
    }
}