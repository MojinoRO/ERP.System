using ERP.Application.DTOs;
using Microsoft.AspNetCore.Mvc;
using ERP.Application.Interfaces;

namespace ERP.WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConfDepartamentoController : ControllerBase
    {
        private readonly IConfDepartamentoService _service;
        public ConfDepartamentoController(IConfDepartamentoService service) =>_service=service;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ConfDepartamentosDTO>>> ListadoDepartamento()
        {
            var list = await _service.GetAllAsync();
            if(!list.Success)
                return BadRequest(list);
            return Ok(list);
        }

        [HttpGet("name/{name}")]
        public async Task<ActionResult<IEnumerable<ConfDepartamentosDTO>>> ListadoPorNombre(string name)
        {
            var lista = await _service.GetByNameAsync(name);
            if(!lista.Success)
                return BadRequest(lista);
            return Ok(lista);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ConfDepartamentosDTO>>BuscarPorID(int id )
        {
            var search = await _service.GetByIDAsync(id);
            if(!search.Success)
                return BadRequest(search);
            return Ok(search);
        }

        [HttpGet("codigo7{codigo}")]
        public async Task<ActionResult<ConfDepartamentosDTO>>BuscarPorCodigo(string codigo)
        {
            var search = await _service.GetByCodigoAsync(codigo);
            if(!search.Success)
                return BadRequest(search);
            return Ok(search);
        }


        [HttpPost]
        public async Task<ActionResult<ConfDepartamentosDTO>>Crear(CreateConfDepartamentosDTO dto)
        {
            var action = await _service.CreateAsync(dto);
            if(!action.Success)
                return BadRequest(action);
            return Ok(action);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ConfDepartamentosDTO>>UpdateDep(UpdateConfDepartamentosDTO dto)
        {
            var update = await _service.UpdateAsync(dto);
            if(!update.Success) return BadRequest(update.Message);
            return Ok(update);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>>delete(int id)
        {
            var delete = await _service.DeleteAsync(id);
            if(!delete.Success)return BadRequest(delete);
            return Ok(delete.Success);
        }
    }
}
