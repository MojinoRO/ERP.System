using System.ComponentModel.DataAnnotations;
using ERP.Application.DTOs;
using ERP.Domain.interfaces;

namespace ERP.Application.Services;

public class ConfUsuariosServices : IConfUsuariosRepository
{
    private readonly IConfUsuariosRepository _repo;
    public  ConfUsuariosServices(IConfUsuariosRepository repo) => _repo=repo;

    public async Task<IEnumerable<ConfUsuariosReponseDTO>> GetAllAsync()
    {
        var usuarios = await _repo.GetAllAsync();
        return usuarios.Select(ConfUsuarioMapper.ToDto);
    }
}