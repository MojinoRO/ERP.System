using System.Diagnostics;
using ERP.Application.DTOs;
using ERP.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ERP.WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConfCiudadesController : ControllerBase
    {
        private readonly IConfCiudadesService _service;
        public ConfCiudadesController(IConfCiudadesService service) => _service=service;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ConfEmpresaDTO>>>ListarCiudades()
        {
            var listado = await _service.GetAllAsync();
            if(!listado.Success) return BadRequest(listado.Message);
            return Ok(listado);
        }

        [HttpGet("{name}")]
        public async Task<ActionResult<IEnumerable<ConfCiudadesDTO>>>BuscarPorNombre(string name)
        {
            var listado = await _service.GetByNameAsync(name);
            if(!listado.Success) return BadRequest(listado.Message);
            return Ok(listado);
        }

        [HttpGet("codigo/{codigo}")]
        public async Task<ActionResult<ConfCiudadesDTO>>BuscarPorCodigo(string codigo)
        {
            var listado = await _service.GetByCodigoAsync(codigo);
            if(!listado.Success) return BadRequest(listado.Message);
            return Ok(listado);
        }

        [HttpGet("id/{id}")]
        public async Task<ActionResult<ConfCiudadesDTO>>BuscarPorID(int id)
        {
            var listado = await _service.GetByIdAsync(id);
            if(!listado.Success)return BadRequest(listado.Success);
            return Ok(listado);
        }

        [HttpPost]
        public async Task<ActionResult<ConfCiudadesDTO>>CrearCiudad(CreateConfCiudadesDTO dto)
        {
            var action  = await _service.CreateAsync(dto);
            if(!action.Success) return BadRequest(action.Message);
            return CreatedAtAction(nameof(BuscarPorID), new {id =action.Data?.CiudadID},action);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ConfCiudadesDTO>>ActualizarCiudades(UpdateConfCiudadesDTO dto)
        {
            var objecto =await _service.UpdateAsync(dto);
            if(!objecto.Success) return BadRequest(objecto.Message);
            return Ok(objecto);
        }

        [HttpDelete]
        public async Task<ActionResult<bool>>DeleteAsync(int id)
        {
            var objecto = await _service.DeleteAsync(id);
            if(!objecto.Success)return BadRequest(objecto.Message);
            return true;
        }
    }
}