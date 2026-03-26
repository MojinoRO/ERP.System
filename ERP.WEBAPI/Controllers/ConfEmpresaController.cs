using System.Diagnostics;
using ERP.Application.DTOs;
using ERP.Application.interfaces;
using ERP.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ERP.WEBAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ConfEmpresaController : ControllerBase
{
    private readonly IConfEmpresaService _service;

    public ConfEmpresaController(IConfEmpresaService service) => _service=service;

    //get api/empresa
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var empresa = await _service.GetAllAsync();
        return Ok(empresa);
    }
    //GET api/ConfEmpresa/1
    [HttpGet("{id}")]
    public async Task<IActionResult>GetById(int id)
    {
        var empresa = await _service.GetByIdAsync(id);
        if(empresa == null)return NotFound();
        return Ok(empresa);
    }
    
    //post api/empresa

    [HttpPost]
    public async Task<IActionResult>Create([FromBody] CreateConfEmpresaDTO dto)
    {
        try
        {
            var creada = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById),new {id= creada.EmpresaID },creada);

        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }
    

    [HttpPut("{id}")]
    public async Task<IActionResult>Update(int id, [FromBody] UpdateConfEmpresaDTO dto)
    {
        if(id != dto.EmpresaID) return BadRequest("El ID no Coincide");
        var UpdateEmpresa = await _service.UpdateAsync(dto);
        if(UpdateEmpresa == null) return NotFound();
        return Ok(UpdateEmpresa);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var resultado = await _service.DeleteAsync(id);
        if(!resultado) return NotFound();
        return NoContent();
    }

}