using ERP.Domain.Entities;
namespace ERP.Domain.Interfaces
{
    public interface IIntLegalizacionTransportadoresRepository
    {
        Task<IEnumerable<IntLegalizacionTransportadores>>GetByFecha(DateTime fechadesde,DateTime fechahasta);
        Task<IntLegalizacionTransportadores?>GetById(int id);
        Task<IntLegalizacionTransportadores>CreateLegalizacion(IntLegalizacionTransportadores data);
        Task<IntLegalizacionTransportadores>UpdateLegalizacion(IntLegalizacionTransportadores data);
        Task<bool>DeleteLegalizacion(int id);
    }
}