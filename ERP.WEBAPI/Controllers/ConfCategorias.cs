using ERP.Application.Interfaces;
using ERP.Application.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace ERP.WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ConfCategoriasController : ControllerBase
    {
        private readonly IConfCategoriasServices _service;
        public ConfCategoriasController(IConfCategoriasServices service)=>_service=service;

        [HttpGet]
        public async Task<ActionResult<ConfCategoriasDto>> listadoCategorias()
        {
            try
            {
                var listadoCategorias  = await _service.getAllAsync();
                return Ok(listadoCategorias);
            }catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("id/{id}")]
        public async Task<ActionResult<ConfCategoriasDto?>>getByID(int id)
        {
            try
            {
                var Categoria = await _service.getByIdAsync(id);
                if(Categoria== null)return BadRequest("No hay categoria");
                return Ok(Categoria);
            }catch(Exception ex)
            {
               return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("codigo/{codigo}")]
        public async Task<ActionResult<ConfCategoriasDto>>getByCodigo(string codigo)
        {
            try
            {
                var Categoria = await _service.getByCodigoAsync(codigo);
                if(Categoria== null)return BadRequest("No hay categoria");
                return Ok(Categoria);

            }catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<ConfCategoriasDto>>CrearCategorias([FromBody]CreateConfCategoriasDto dto)
        {
            if(!ModelState.IsValid)
                    return BadRequest(ModelState);
            try
            {
                var creado = await _service.CreateAsync(dto);
                return CreatedAtAction(nameof(getByID), new { id = creado.CategoriaID }, creado);
            }catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<ConfCategoriasDto>>UpdateCategoria(int id,[FromBody]UpdateConfCategoriasDto dto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                var update = await _service.UpdateAsync(id,dto);
                return Ok(update);
            }catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult>deleteCategorias(int id)
        {
            if(id ==0)
                return BadRequest("Categoria No Existe");
            var eliminado = await _service.DeleteAsync(id);
            return NoContent();
            
        }
    }
}