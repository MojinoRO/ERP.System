using ERP.Application.interfaces;
using ERP.Application.Services;
using ERP.Domain.interfaces;
using ERP.Infrastructure.Data;
using ERP.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using ERP.WEBAPI.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IConfEmpresaService,ConfEmpresaService>();
builder.Services.AddScoped<IConfEmpresaRepository,ConfEmpresaRepository>();
builder.Services.AddEndpointsApiExplorer();

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
app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseHttpsRedirection();
app.MapControllers(); 
app.Run();
