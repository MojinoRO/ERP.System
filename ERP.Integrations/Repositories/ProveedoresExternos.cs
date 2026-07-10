using Dapper;
using Erp.Integrations.Data;
using Erp.Integrations.Entities;
namespace Erp.Integrations.Repositories;
public interface IProveedoresExternosRepository
{
    Task<IEnumerable<ProveedoresExternos>>ObtenerProveedores();
}

public class ProveedoresExternosRepository : IProveedoresExternosRepository
{
    private readonly IExternalDbConnectionFactory _factory;
    public ProveedoresExternosRepository(IExternalDbConnectionFactory factory)=>_factory = factory;

    public async Task<IEnumerable<ProveedoresExternos>> ObtenerProveedores()
    {
        using var conection = _factory.CreateConection();
        const string query = 
        @"SELECT  TercerosID, TercerosIdentificacion, TercerosNombres ,TercerosCodigoAlterno , ZonasID 
        FROM AdmTerceros
        WHERE TercerosProveedor=1";
        return await conection.QueryAsync<ProveedoresExternos>(query);
    }
}
