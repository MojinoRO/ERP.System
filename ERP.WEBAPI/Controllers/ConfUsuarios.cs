using System.Net.Http.Headers;
using ERP.Application.DTOs;
using ERP.Application.Interfaces;
using ERP.Domain.Entities;
using ERP.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ERP.WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]

    public class ConfUsuariosController :ControllerBase
    {
        private readonly IConfUsuariosService _service;

        public ConfUsuariosController(IConfUsuariosService service )=>_service=service;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ConfUsuariosDTO>>> GetAllAsync()
        {
            var  productos = await _service.GetAllAsync();
            return Ok (productos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ConfUsuariosDTO>>GetByIdAsync(int id)
        {
            var user = await _service.GetByIdAsync(id);
            if(user == null)
                return NotFound();
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<ConfUsuariosDTO>>Create([FromBody] CreateConfUsuariosDTO dto)
        {
            try
            {
                var creado = await _service.CreateUserAsync(dto);
                return CreatedAtAction(nameof(GetByIdAsync), new {id = creado.UsuarioID},creado);

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}