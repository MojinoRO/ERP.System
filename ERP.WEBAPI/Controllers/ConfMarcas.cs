using System.Dynamic;
using ERP.Application.DTOs;
using ERP.Application.Interfaces;
using ERP.Application.Services;
using ERP.Infrastructure.Migrations;
using Microsoft.AspNetCore.Mvc;

namespace ERP.WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ConfMarcasController : ControllerBase
    {
        private readonly IConfMarcaservice _service;
        public ConfMarcasController(IConfMarcaservice service)=>_service=service;

        [HttpGet]
        public async Task<ActionResult<ConfMarcasDto>> ListaMarcas()
        {
            try
            {
                var Marcas =  await _service.GetAllAsync();
                return Ok(Marcas);
            }catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }

        [HttpGet("id/{id}")]
        public async Task<ActionResult<ConfMarcasDto>>BuscarPorId(int id)
        {
            try
            {
                var marca = await _service.GetByIdAsync(id);
                return Ok(marca);

            }catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }

        [HttpGet("codigo/{codigo}")]
        public async Task<ActionResult<ConfMarcasDto>>BuscaCodigo(string codigo)
        {
            try
            {
                var marca = await _service.GetByCodigoAsync(codigo);
                if(marca == null) return NotFound("Codigo No Existe");
                return Ok(marca);
            }catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }            
        }

        [HttpGet("nombre/{nombre}")]
        public async Task<ActionResult<ConfMarcasDto>>buscarPorNombre(string nombre)
        {
            try
            {
                var marca = await _service.GetByNombreAsync(nombre);
                return Ok(marca);
            }catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }            
        }

        [HttpPost]
        public async Task<ActionResult<CreateConfMarcasDto>>CrearMarca( [FromBody]CreateConfMarcasDto dto)
        {
            if(!ModelState.IsValid)return BadRequest(ModelState);
            try
            {
                var Crear = await _service.CreateAsync(dto);
                return CreatedAtAction(nameof(BuscarPorId), new{id = Crear.MarcaID},Crear);
            }
            catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }          
        }

        [HttpPut]
        public async Task<ActionResult<UpdateConfMarcasDto>>updateMarca([FromBody] UpdateConfMarcasDto dto)
        {
            if(dto == null)return BadRequest("Actualizacion sin datos");
            if(!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var update = await _service.UpdateAsync(dto);
                return CreatedAtAction(nameof(BuscarPorId), new{id=update.MarcaID},update);

            }catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }

        [HttpDelete("id/{id}")]
        public async Task<ActionResult> BorrarMarca(int id)
        {
            if(await _service.GetByIdAsync(id) == null)
            {
                return BadRequest("Marca No Existe");
            }
            try
            {
                var eliminado = await _service.DeleteAsync(id);
                return NoContent();
            }catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }
    }
}