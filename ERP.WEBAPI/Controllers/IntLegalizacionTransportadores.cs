using ERP.Application.Interfaces;
using ERP.Application.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace ERP.WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IntLegalizacionTransportadoresController : ControllerBase
    {
        private readonly IIntLegalizacionTransportadoresService _service;

        public IntLegalizacionTransportadoresController(IIntLegalizacionTransportadoresService service )=>_service=service;

        
        [HttpGet("legalizaciones/{desde}/{hasta}/{id}")]
        public async Task<ActionResult<IEnumerable<IntLegalizacionTransportadoresDTO>>>ListarLegalizaciones(DateOnly desde , DateOnly hasta , int id)
        {
            var listado = await _service.getByFechaAsync(desde, hasta, id);
            if(!listado.Success)return BadRequest(listado.Message);
            return Ok(listado);
        }

        [HttpPost("created")]
        public async Task<ActionResult<IntLegalizacionTransportadoresDTO>>CreateLegalizacion([FromBody] CreateIntLegalizacionTransportadoresDTO data)
        {
            var creado = await _service.createLegalizacionAsync(data);
            if(!creado.Success)return BadRequest(creado.Message);
            return Ok(creado);
        }

        [HttpGet("buscarPorId")]
        public async Task<ActionResult<IntLegalizacionTransportadoresDTO>>BuscarPorID(int id)
        {
            var entity = await _service.getByIdAsync(id);
            if(!entity.Success) return BadRequest(entity.Message);
            return Ok(entity);  
        }

        [HttpPut("Update")]
        public async Task<ActionResult<IntLegalizacionTransportadoresDTO>>UpdateLegalizacion([FromBody] UpdateIntLegalizacionTransportadoresDTO data)
        {
            var update = await _service.updateLegalizacionAsync(data);
            if(!update.Success) return BadRequest(update.Message);
            return Ok(update);
        }

        [HttpDelete("borrar")]
        public async Task<ActionResult<bool>>deleteLegalizacion(int id)
        {
            var delete = await _service.deleteLegalizacionAsync(id);
            if(!delete.Success)return BadRequest(delete.Message);
            return Ok(delete);
        }
    }
}