using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace ERP.Integrations.Data;

public interface IExternalDbConnectionFactory
{
    IDbConnection CreateConection();
}

public class ExternalDbConnectionFactory : IExternalDbConnectionFactory
{
    private readonly string _ConectionString;

    public ExternalDbConnectionFactory(IConfiguration configuration)
    {
        _ConectionString= configuration.GetConnectionString("ExternalConnection") 
         ?? throw new InvalidOperationException("ExternalConnection no configurada");
    }
    public IDbConnection CreateConection() => new SqlConnection(_ConectionString);
}