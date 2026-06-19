using ERP.Application.DTOs;
using ERP.Application.Interfaces;
using ERP.Application.Services;
using ERP.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ERP.WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConfCuentasPucController : ControllerBase
    {
        private readonly IConfCuentasPucService _service;
        public ConfCuentasPucController(IConfCuentasPucService service)=>_service=service;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ConfCuentasPucDto>>> ListarCuentas()
        {
            var lista = await _service.GetAllAsync();
            if(!lista.Success) return BadRequest(lista.Message);
            return Ok(lista);
        }
    }
}