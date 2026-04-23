using ERP.Application.Interfaces;
using ERP.Application.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Diagnostics;

namespace ERP.WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ConfVendedoresController : ControllerBase
    {
        private readonly IConfVendedoresServices _service;
        public ConfVendedoresController(IConfVendedoresServices services )=> _service =services;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ConfVendedoresDTO>>>GetAllAsync()
        {
            var vendedores = await _service.GetALLAsync();
            return Ok (vendedores);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<ConfVendedoresDTO>>GetByIdAsync(int id)
        {
            var vendedor = await _service.GetByIdAsync(id);
            return Ok(vendedor);
        }

        [HttpPost]
        public async Task<ActionResult<ConfVendedoresDTO>>CreateVendedor(CreateConfVendedoresDTO dto)
        {
            try
            {
                var creado = await _service.CreateAsync(dto);
                return Ok(creado);

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPut("{id}")]
        public async Task<ActionResult<UpdateConfVendedoresDTO>>Update(int id,[FromBody] UpdateConfVendedoresDTO dto)
        {
            try
            {
                if(dto == null){
                    return BadRequest("sin datos");
                }
                var update = await _service.UpdateAsyc(id,dto);
                return Ok(update);
                
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}