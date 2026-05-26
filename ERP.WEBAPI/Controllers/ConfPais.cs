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
    }
}