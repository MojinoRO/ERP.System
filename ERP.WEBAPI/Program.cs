using ERP.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using ERP.WEBAPI.Middleware;
using ERP.Application.Interfaces;
using ERP.Application.Services;
using ERP.Infrastructure.Repositories;
using ERP.Domain.Interfaces;
using ERP.Integrations.Data;
using ERP.Integrations.Repositories;


using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ERP.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));



builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());    
// ─── REGISTRAR REPOSITORIOS (Infrastructure) ─────────────────
// Cuando alguien pida IProductoRepository, dale ProductoRepository
builder.Services.AddScoped<IConfUsuariosRepository,ConfUsuariosRepository>();
// ─── REGISTRAR SERVICIOS (Application) ───────────────────────
// Cuando alguien pida IProductoService, dale ProductoService
builder.Services.AddScoped<IConfUsuariosService, ConfUsuariosServices>();
builder.Services.AddScoped<IConfEmpresaRepository,ConfEmpresaRepository>();
builder.Services.AddScoped<IConfEmpresaService,ConfEmpresaService>();
builder.Services.AddScoped<IConfVendedoresRepository, ConfVendedoresRepository>();
builder.Services.AddScoped<IConfVendedoresServices, ConfVendedoresService>();
builder.Services.AddScoped<IConfCatagoriasRepository,ConfCategoriasRepository>();
builder.Services.AddScoped<IConfCategoriasServices,ConfCategoriasService>();
builder.Services.AddScoped<IConfSubCategoriasRepository,ConfSubCategoriasRepository>();
builder.Services.AddScoped<IConfSubCategoriasService,ConfSubCategoriasService>();
builder.Services.AddScoped<IConfMarcasRepository,ConfMarcasRepository>();
builder.Services.AddScoped<IConfMarcaservice,ConfMarcasService>();
builder.Services.AddScoped<IConfAlmacenesRepository,ConfAlmacenesRepository>();
builder.Services.AddScoped<IConfAlmacenesServices,ConfAlmacenesServices>();
builder.Services.AddScoped<IConfPaisRepository,ConfPaisRepository>();
builder.Services.AddScoped<IConfPaisServices,ConfPaisService>();
builder.Services.AddScoped<IConfDepartamentoService,ConfDepartamentosServices>();
builder.Services.AddScoped<IConfDepartamentosRepository,ConfDepartamentosRepository>();
builder.Services.AddScoped<IConfCiudadesRepository,ConfCiudadesRepository>();
builder.Services.AddScoped<IConfCiudadesService,ConfCiudadesServices>();
builder.Services.AddScoped<IConfCuentasPucRepository,ConfCuentasPucReposiroty>();
builder.Services.AddScoped<IConfCuentasPucService,ConfCuentasPucService>();
builder.Services.AddScoped<IExternalDbConnectionFactory, ExternalDbConnectionFactory>();
builder.Services.AddScoped<IProveedorExternoRepository, ProveedorExternoRepository>();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(options => {
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173",
                            "http://192.168.20.35:5173")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
}
);

builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
    };
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    try
    {
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var pendingMigrations = context.Database.GetPendingMigrations();
        if (pendingMigrations.Any())
        {
            context.Database.Migrate();
        }
    }catch(Exception ex)
    {
        Console.WriteLine($"Error aplicando migraciones: {ex}");
        throw;
    }
}

//uso del middleware
app.UseMiddleware<ErrorHandlingMiddleware>();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowFrontend");
//app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseAuthentication();
app.UseAuthorization();
app.UseHttpsRedirection();
app.MapControllers(); 
app.Run();
