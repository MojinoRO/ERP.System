using ERP.Application.DTOs;
using ERP.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ERP.WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConfAlmacenesController : ControllerBase
    {
        private readonly IConfAlmacenesServices _service;
        public ConfAlmacenesController(IConfAlmacenesServices services)
        {
            _service = services;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ConfAlmacenDTO>>> ListarAlmacenes()
        {
            var almacenes = await _service.GetAllAsync();
            return Ok(almacenes);
        }

        [HttpGet("nombre/{nombre}")]
        public async Task<ActionResult<IEnumerable<ConfAlmacenDTO>>> ListadoPorNombre(string nombre)
        {
            if (string.IsNullOrWhiteSpace(nombre))
                return BadRequest("El nombre es obligatorio");

            var almacenes = await _service.GetByNameAsync(nombre);

            return Ok(almacenes);
        }

        [HttpGet("{codigo}")]
        public async Task<ActionResult<bool>> ValidarCodigo(string codigo)
        {
            if (string.IsNullOrWhiteSpace(codigo))
                return BadRequest("El código es obligatorio");

            var existe = await _service.GetByCodigoAsync(codigo);

            return Ok(existe);
        }

        [HttpGet("id/{id}")]
        public async Task<ActionResult<ConfAlmacenDTO>> ListarPorID(int id)
        {
            if (id <= 0)
                return BadRequest("Id inválido");

            var almacen = await _service.GetByIDAsync(id);

            if (almacen == null)
                return NotFound();

            return Ok(almacen);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0)
                return BadRequest("Id inválido");

            var deleted = await _service.DeleteAsync(id);

            if (!deleted)
                return NotFound();

            return NoContent();
        }
        [HttpPost]
        public async Task<ActionResult<ConfAlmacenDTO>>CrearAlmacen([FromBody]CreateConfAlmacenDTO almacen)
        {
            var almacennew = await _service.CreateAlmacenAsync(almacen);
            if(almacennew == null)  throw new InvalidOperationException("No se pudo crear el almacén");
            return CreatedAtAction(nameof(ListarPorID), new {id=almacennew.AlmacenID},almacennew);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ConfAlmacenDTO>>UpdateAlmacen(int id,[FromBody] UpdateConfAlmacenDTO almacen)
        {
            if(id != almacen.AlmacenID)
                return BadRequest();
            var almacenUpdate = await _service.UpdateAlmacenAsync(almacen);
            if(almacenUpdate == null) throw new InvalidOperationException("No se pudo Actualziar el almacén");
            return Ok(almacenUpdate);
        }
    }
}