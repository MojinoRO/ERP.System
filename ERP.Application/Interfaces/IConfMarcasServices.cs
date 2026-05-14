using ERP.Application.DTOs;

namespace ERP.Application.Interfaces
{
    public interface IConfMarcaservice
    {
        Task<IEnumerable<ConfMarcasDto>>GetAllAsync();
        Task<IEnumerable<ConfMarcasDto?>>GetByNombreAsync(string nombre);
        Task<ConfMarcasDto?>GetByCodigoAsync(string codigo);
        Task<ConfMarcasDto?>GetByIdAsync(int id);
        Task<ConfMarcasDto>CreateAsync(CreateConfMarcasDto dto);
        Task<ConfMarcasDto>UpdateAsync(UpdateConfMarcasDto dto);
        Task<bool>DeleteAsync(int id);
    } 
}