using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;
using ERP.Application.DTOs;
using ERP.Application.interfaces;
using ERP.Domain.interfaces;

namespace ERP.Application.Services;

public class ConfUsuariosServices : IConfUsuariosService
{
    private readonly IConfUsuariosRepository _repo;
    public  ConfUsuariosServices(IConfUsuariosRepository repo) => _repo=repo;

    public async Task<IEnumerable<ConfUsuariosReponseDTO>>GetAllAsync()
    {
        var empresa = await _repo.GetAllAsync();
        return empresa.Select(ConfUsuarioMapper.ToDto);
    }
    public async Task<ConfUsuariosReponseDTO?>GetByIdAsync(int id)
    {
        var empresa= await _repo.GetByIdAsync(id);
        if(empresa  == null) return null!;
        return ConfUsuarioMapper.ToDto(empresa);
    }
    public async Task<ConfUsuariosReponseDTO>CreateAsync(CreateConfUsuariosDTO user)
    {
        var existe = await _repo.GetByName(user.UsuarioNombre);
        if (existe == null)
            throw new InvalidOperationException($"Ya existe usuario con el nombre{user.UsuarioNombre}");
        
        var newUser = ConfUsuarioMapper.ToEntity(user);
        var Creada = await _repo.CreateAsync(newUser);
        return ConfUsuarioMapper.ToDto(Creada);
    }
    public async Task<ConfUsuariosReponseDTO?> UpdateAsync(UpdateConfUsuariosDTO user)
    {
        var entidad = ConfUsuarioMapper.ToEntity(user);
        var actualizada = await _repo.UpdateAsync(entidad);
        if(actualizada == null) return null;
        return ConfUsuarioMapper.ToDto(actualizada);
    }
    public async Task<bool> DeleteAsync(int id)
    {
        return await _repo.DeleteAsync(id);
    }
}