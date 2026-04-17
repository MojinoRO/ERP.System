using ERP.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using ERP.WEBAPI.Middleware;
using ERP.Application.Interfaces;
using ERP.Application.Services;
using ERP.Domain.Entities;
using ERP.Infrastructure.Repositories;
using ERP.Domain.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
    
// ─── REGISTRAR REPOSITORIOS (Infrastructure) ─────────────────
// Cuando alguien pida IProductoRepository, dale ProductoRepository
builder.Services.AddScoped<IConfUsuariosRepository,ConfUsuariosRepository>();
// ─── REGISTRAR SERVICIOS (Application) ───────────────────────
// Cuando alguien pida IProductoService, dale ProductoService
builder.Services.AddScoped<IConfUsuariosService, ConfUsuariosServices>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(options => {
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
}
);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowFrontend");
//app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseHttpsRedirection();
app.MapControllers(); 
app.Run();
