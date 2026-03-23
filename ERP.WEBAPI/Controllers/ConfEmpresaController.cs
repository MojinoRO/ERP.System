using System.Diagnostics;
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
    public async Task<IActionResult> Create([FromBody] ConfEmpresa empresa)
    {
        var Newempresa = await _service.CreateAsync(empresa);
        return CreatedAtAction(nameof(GetById), new {id = Newempresa.EmpresaID},Newempresa);
    }
    

    [HttpPut("{id}")]
    public async Task<IActionResult>Update(int id, [FromBody] ConfEmpresa empresa)
    {
        if(id != empresa.EmpresaID) return BadRequest("El ID no Coincide");
        var UpdateEmpresa = await _service.UpdateAsync(empresa);
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