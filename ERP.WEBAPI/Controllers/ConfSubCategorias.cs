using ERP.Application.DTOs;
using ERP.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ERP.WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]

    public class ConfSubCategoriasController : ControllerBase
    {
        private readonly IConfSubCategoriasService _service;

        public ConfSubCategoriasController(IConfSubCategoriasService service ) => _service =service;

        [HttpGet]
        public async Task<ActionResult<ConfSubCategeriasDTOs>> ListadoSubcategorias()
        {
            try
            {
                var ListSubCategorias = await _service.getAllAsync();
                return Ok(ListSubCategorias);
                
            }catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }

        [HttpGet("id/{id}")]
        public async Task <ActionResult<ConfSubCategeriasDTOs>>GetById(int id)
        {
            try
            {
                var subcategoria = await _service.getByIDAsync(id);
                if(subcategoria == null) return BadRequest("Subcategoria No Existe");
                return Ok(subcategoria);
            }catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }

        [HttpGet("Codigo/{codigo}")]
        public async Task<ActionResult<ConfSubCategeriasDTOs>>GetByCodigo(string codigo , int CategoriaID)
        {
            try
            {
                var subcategoria = await _service.getByCodigoAsync(codigo,CategoriaID);
                if(subcategoria == null) return NotFound("Codigo No Existe");
                return Ok(subcategoria);
            }catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<CreateSubCategeriasDTOs>>CreateSubCategorias(CreateSubCategeriasDTOs dto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                var subcategoria  = await _service.CreateSubCategoriasAsync(dto);
                return CreatedAtAction(nameof(GetById),new {id = subcategoria.CategoriaID},subcategoria);
            }
            catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }

        [HttpPut("id/{id}")]
        public async Task<ActionResult<UpdateSubCategeriasDTOs>>UpdateSubCategorias(int id,[FromBody]UpdateSubCategeriasDTOs dto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                var update = await _service.UpdateSubCategoriasAsync(id,dto);
                return Ok(update);
            }catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }
        

        [HttpDelete("id/{id}")]
        public async Task<ActionResult>DeleteSubCategorias(int id)
        {
            var requestId = await _service.getByIDAsync(id);
            if(requestId == null)return BadRequest("Id a eliminar no existe");
            try
            {
                var eliminado = await _service.deleteSubCategoriasAsync(id);
                return NoContent();
            }
            catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }
    }
}