using ERP.Domain.Entities;

namespace ERP.Application.DTOs;

public static  class ConfEmpresaMapper
{
    public static ConfEmpresa ToEntity(CreateConfEmpresaDTO dto)
    {
        return new ConfEmpresa
        {
            EmpresaNit= dto.EmpresaNit,
            EmpresaNombre=dto.EmpresaNombre
        };
    }

    public static ConfEmpresa ToEntity(UpdateConfEmpresaDTO dto)
    {
        return new ConfEmpresa
        {
            EmpresaID =dto.EmpresaID,
            EmpresaNit =dto.EmpresaNit,
            EmpresaNombre= dto.EmpresaNombre
        };
    }

    public static ConfEmpresaResponseDTO ToDto( ConfEmpresa entity)
    {
        return new ConfEmpresaResponseDTO
        {
            EmpresaID=entity.EmpresaID,
            EmpresaNit=entity.EmpresaNit,
            EmpresaNombre=entity.EmpresaNombre
        };
    }
}