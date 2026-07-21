using ERP.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using ERP.Application.DTOs;

namespace ERP.WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IntAnticiposController  : ControllerBase
    {
        private readonly IIntAnticiposServices _service;

        public IntAnticiposController(IIntAnticiposServices service)=>_service=service;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<IntAnticiposDto>>> ListarAnticipos()
        {
            var list = await _service.GetAllAsync();
            if(!list.Success) return NotFound();
            return Ok(list);
        }

        [HttpGet("fechas/{desde}/{hasta}")]
        public async Task<ActionResult<IEnumerable<IntAnticiposDto>>> ListarPorFechasTercero( DateOnly desde  , DateOnly hasta , int id )
        {
            var list = await _service.GetByFechaTerceroAsync(desde, hasta, id);
            if(!list.Success) return BadRequest(list.Message);
            return Ok(list);
        }

        [HttpPost]
        public async Task<ActionResult<IntAnticiposDto>>Create([FromBody] CreateIntAnticiposDto dto)
        {
            var action = await _service.CreateAsync(dto);
            if(!action.Success)
                return BadRequest(action.Message);
            return Ok(action);
        }

        [HttpPut("id/{id}")]
        public async Task<ActionResult<IntAnticiposDto>>Update([FromBody] UpdateIntAnticiposDto dto , int id)
        {
            var action = await _service.UpdateAsync(id , dto);
            if(!action.Success)
                return BadRequest(action.Message);
            return Ok(action);
        }

        [HttpDelete("id/{id}")]
        public async Task<ActionResult<bool>>Delete(int id)
        {
            var action = await _service.DeleteAsync(id);
            if(!action.Success)
                return BadRequest(action.Message);
            return Ok(action);
        }
    }
}