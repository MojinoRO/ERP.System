using ERP.Application.DTOs;
using ERP.Domain.Entities;

namespace ERP.Application.interfaces;

public interface IConfEmpresaService
{
    Task<IEnumerable<ConfEmpresaResponseDTO>>GetAllAsync();
    Task<ConfEmpresaResponseDTO?>GetByIdAsync(int id);
    Task<ConfEmpresaResponseDTO>CreateAsync(CreateConfEmpresaDTO empresa);
    Task<ConfEmpresaResponseDTO?>UpdateAsync(UpdateConfEmpresaDTO empresa);
    Task<bool>DeleteAsync(int id);
}

