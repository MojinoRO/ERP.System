using ERP.Application.DTOs;
using ERP.Application.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ERP.WEBAPI.Controllers;

[ApiController]
[Route("api/[Controller]")]

public class ConfUsuariosController : ControllerBase
{
    private readonly IConfUsuariosService _service;
    public ConfUsuariosController(IConfUsuariosService service )=> _service =service;

    [HttpGet]
    public async Task<IActionResult> GetAllAsync()
    {
        var user = await _service.GetAllAsync();
        return Ok(user);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAync(int id)
    {
        var empresa = await _service.GetByIdAsync(id);
        if(empresa == null )return NotFound();
        return Ok(empresa);
    }

    [HttpPost]
    public async Task<IActionResult>CreateUser([FromBody] CreateConfUsuariosDTO userNew)
    {
        try
        {
            var creada = await _service.CreateAsync(userNew);
            return CreatedAtAction(nameof(GetByIdAync), new{id=creada.UsuarioID},creada);

        }catch(InvalidOperationException ex)
        {
            return BadRequest(new {message = ex.Message});
        }
    }

    [HttpPut]
    public async Task<IActionResult>UpdateAsync(int id ,[FromBody] UpdateConfUsuariosDTO user)
    {
        try
        {
            if(id != user.UsuarioID) return BadRequest("El ID  del usuario no existe");
            var UserUpdate = await _service.UpdateAsync(user);
            if(UserUpdate == null)  return NotFound();
            return Ok(UserUpdate);
        }
        catch(InvalidOperationException ex)
        {
            return BadRequest(ex.Data);
        }
    }

    [HttpDelete]
    public async Task<IActionResult>DeleteUser(int id)
    {
        var resultado = await _service.DeleteAsync(id);
        if(!resultado) return NotFound();
        return NoContent();
    }
}