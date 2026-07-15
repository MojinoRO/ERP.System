using Dapper;
using ERP.Integrations.Data;
using ERP.Integrations.Entities;
namespace ERP.Integrations.Repositories;
public interface IProveedoresExternosRepository
{
    Task<IEnumerable<ProveedoresExternos>>ObtenerProveedores(string texts);
    Task<IEnumerable<Zonas>>ObtenerZonas();
    Task<IEnumerable<ProveedoresExternos>>ObtenerProveedoresXUbicacion(int Ubicacion);
    Task<IEnumerable<Ubicaciones>>ObtenerUbicaciones();
    Task<Articulos?>ObtenerArticulos();
    Task<Documentos?>ObtenerDocumentoCompra();
}

public class ProveedoresExternosRepository : IProveedoresExternosRepository
{
    private readonly IExternalDbConnectionFactory _factory;
    public ProveedoresExternosRepository(IExternalDbConnectionFactory factory)=>_factory = factory;

    public async Task<IEnumerable<ProveedoresExternos>> ObtenerProveedores(string text)
    {
        using var conection = _factory.CreateConection();
        const string query = 
        @"SELECT  TercerosID, TercerosIdentificacion, TercerosNombres ,TercerosCodigoAlterno , ZonasID 
        FROM AdmTerceros
        WHERE TercerosProveedor=1 And  TercerosNombres like @parametro";
        return await conection.QueryAsync<ProveedoresExternos>(query, new {parametro = $"%{text}%"});
    }

    public async Task<IEnumerable<Ubicaciones>> ObtenerUbicaciones()
    {
        using var conection = _factory.CreateConection();
        const string query = 
        @"select UbicacionID, UbicacionCodigo, UbicacionNombre from AdmUbicacion";
        return await conection.QueryAsync<Ubicaciones>(query);
    }

    public async Task<IEnumerable<Zonas>> ObtenerZonas()
    {
        using var  conection = _factory.CreateConection();
        const string query =
        @"select ZonasID,ZonasCodigo ,ZonasNombre
        from AdmZonas";
        return await conection.QueryAsync<Zonas>(query);
    }

    public async Task<Articulos?> ObtenerArticulos()
    {
        using var conection = _factory.CreateConection();
        const string query = 
        @"select ArticulosID,ArticulosCodigo,ArticulosNombre,ArticulosCosto=ROUND(ArticulosCosto,0)
        from AdmArticulos 
        where ArticulosCodigo='10100001'";
        return await conection.QueryFirstOrDefaultAsync<Articulos>(query);
    }

    public async Task<Documentos?> ObtenerDocumentoCompra()
    {
        using var conection = _factory.CreateConection();
        const string Query =
        @"select  DocumentosID, DocumentosCodigo, DocumentosNombre
        from AdmDocumentos
        where DocumentosCodigo='RCT'";
        return await conection.QueryFirstOrDefaultAsync<Documentos>(Query);
    }

    public async Task<IEnumerable<ProveedoresExternos>> ObtenerProveedoresXUbicacion(int zona)
    {
        using var conection = _factory.CreateConection();
        const string Query =
        @"select TercerosID, TercerosIdentificacion , TercerosNombres , TercerosCodigoAlterno , ZonasID 
        from AdmTerceros 
        Where TercerosProveedor=1 and ZonasID =@Zona";
        return await conection.QueryAsync<ProveedoresExternos>(Query, new {Zona = zona});
    }


}
