using ERP.Application.DTOs;
using ERP.Application.Interfaces;
using ERP.Domain.Entities;
using ERP.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ERP.WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ConfEmpresaController : ControllerBase
    {
        private readonly IConfEmpresaService _service;
        public ConfEmpresaController(IConfEmpresaService service)=> _service=service;

        [HttpGet]
        public async Task<ActionResult<ConfEmpresaDTO>> GetAll()
        {
            var empresa = await _service.GetAllAsync();
            if(empresa == null) return BadRequest("No hay empresas creadas");
            return Ok(empresa);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ConfEmpresaDTO>> GetById(int id)
        {
            var empresa = await _service.GetByIdAsync(id);
            if(empresa == null) return NotFound("EmpresaID no existe");
            return Ok(empresa);
        }

        [HttpPost]
        public async Task<ActionResult<ConfEmpresaDTO>>Create([FromBody] CreateConfEmpresaDto dto)
        {
            try
            {
                var  creado = await _service.CreateEmpresaAsync(dto);
                return CreatedAtAction(nameof(GetById),new {id =creado.EmpresaID},creado);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<ConfEmpresa>>Update(int id,[FromBody] UpdateConfEmpresaDto dto)
        {
            try
            {
                if(dto == null) return BadRequest("Sin datos");

                var Update = await _service.UpdateEmpresaAsync(id,dto);

                return Ok(Update);

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}