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
    }
}