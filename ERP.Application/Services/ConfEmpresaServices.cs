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

    public async Task<ConfEmpresaResponseDTO?>GetByIdAsync(int id)
    {
       var empresa = await _repository.GetByIdAsync(id);
       if(empresa == null)return null;
       return ConfEmpresaMapper.ToDto(empresa);
    }

    public async Task<ConfEmpresaResponseDTO>CreateAsync(CreateConfEmpresaDTO dto)
    {
        var exite = await _repository.GetByNitAsync(dto.EmpresaNit);
        if(exite != null)
            throw new InvalidOperationException($"Ya existe empresa con el nit {dto.EmpresaNit}");

        var entidad = ConfEmpresaMapper.ToEntity(dto);
        var Creada = await _repository.CreateAsync(entidad);
        return ConfEmpresaMapper.ToDto(Creada);

    }

    public async Task<ConfEmpresaResponseDTO?>UpdateAsync(UpdateConfEmpresaDTO dto)
    {
       var entidad = ConfEmpresaMapper.ToEntity(dto);
       var actualizada = await _repository.UpdateAsync(entidad);
       if(actualizada ==null)return null;
       return ConfEmpresaMapper.ToDto(actualizada);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _repository.DeleteAsync(id);        
    }
}