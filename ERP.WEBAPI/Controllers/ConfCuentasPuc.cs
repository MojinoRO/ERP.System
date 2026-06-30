using System.Net.Http.Headers;
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

        [HttpGet("codigo/{codigo}")]
        public async Task<ActionResult<IEnumerable<ConfCuentasPucDto>>>BuscarPorCodigo(string codigo)
        {
            var cuentas = await _service.GetByCodigo(codigo);
            if(!cuentas.Success) return BadRequest(cuentas.Message);
            return Ok(cuentas);
        }
        
        [HttpGet("callcode/{codigo}")]
        public async Task<ActionResult<ConfCuentasPucDto?>>BuscarCodigo(string codigo)
        {
            var cuenta = await _service.GetCallCode(codigo);
            if(!cuenta.Success) return BadRequest(cuenta.Message);
            return Ok(cuenta);
        }

        [HttpGet("validate/{codigo}")]
        public async Task<ActionResult<bool>>ValidarCodigoEnBD(string codigo)
        {
            var CodigoOk = await _service.ValidateCodigoAsync(codigo);
            if(!CodigoOk.Success) return BadRequest(CodigoOk.Message);
            return Ok(CodigoOk.Message);
        }

        [HttpPost]
        public async Task<ActionResult<ConfCuentasPucDto>>CrearCuenta(CreateConfCuentasPucDto cuenta)
        {
            var creado = await _service.CreateAsync(cuenta);
            if(!creado.Success)return BadRequest(creado.Message);
            return Ok(cuenta);
        }

        [HttpPut("actm&t/{id}")]
        public async Task<ActionResult<ConfCuentasPucDto>>ActMovimientoTerceroCuenta(UpdateMovTerceroCuentaPuc cuenta)
        {
            var update = await _service.UpdateMovimientoTercero(cuenta);
            if(!update.Success)return BadRequest(update.Message);
            return Ok(update);
        }

        [HttpPut("actcuen/{id}")]
        public async Task<ActionResult<ConfCuentasPucDto>>Actualizardatoscuenta(UpdateConfCuentasPucDto cuenta)
        {
            var update = await _service.UpdateGeneralAsync(cuenta);
            if(!update.Success)return BadRequest(update.Message);
            return Ok(update);
        }

        [HttpDelete("del/{id}")]
        public async Task<ActionResult<bool>>BorrarCuentaPuc(int id)
        {
            var delete = await _service.DeleteAsync(id);
            if(!delete.Success)return BadRequest(delete);
            return Ok(delete.Success);
        }
    }
}