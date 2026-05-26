using ERP.Application.Interfaces;
using ERP.Application.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace ERP.WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConfPaisController : ControllerBase
    {
        private readonly IConfPaisServices _service;

        public ConfPaisController(IConfPaisServices services)=>_service = services;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ConfPaisDto>>> ListarPaises()
        {
            var result = await _service.GetAllAsync();
            if(!result.Success)
                return BadRequest(result);
            return Ok(result);
        }

        [HttpGet("{nombre}")]
        public async Task<ActionResult<ConfPaisDto?>>ListadoPorNombre(string nombre)
        {
            var result = await _service.GetByName(nombre);
            if(!result.Success) return BadRequest(result);
            return Ok(result);
        }

        [HttpGet("id/{id}")]
        public async Task<ActionResult<ConfPaisDto>>BuscarByID(int id)
        {
            var result = await _service.GetByIDAsync(id);
            if(!result.Success) return BadRequest(result);
            return Ok(result);
        }

        [HttpGet("codigo/{codigo}")]
        public async Task<ActionResult<ConfPaisDto>>BuscarPorCodigo(string codigo)
        {
            var query = await _service.GetByCodigo(codigo);
            if(!query.Success) return BadRequest(query);
            return Ok(query);
        }

        [HttpPost]
        public async Task<ActionResult<ConfPaisDto>>CrearPais(CreateConfPaisDtos dto)
        {
            var Action = await _service.CreatePaisAsync(dto);
            if(!Action.Success) return BadRequest(Action);
            return Ok(Action);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ConfPaisDto>>Actualizar(UpdateConfPaisDtos dtos)
        {
            var action = await _service.UpdatePaisAsync(dtos);
            if(!action.Success) return BadRequest(action);
            return Ok(action);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>>EliminarPais(int id)
        {
            var result = await _service.DeleteAsync(id);
            if(!result.Success) return BadRequest(result);
            return Ok(result.Success);
        }

    }
}