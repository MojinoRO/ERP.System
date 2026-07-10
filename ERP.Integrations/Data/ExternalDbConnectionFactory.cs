using System.Data;
using System.Data.SqlClient;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Erp.Integrations.Data;

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