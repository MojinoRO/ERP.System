using ERP.Integrations.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ERP.WEBAPI.Controllers;

[ApiController]
[Route("api/[controller]")]

public class IntegrationsController : ControllerBase
{
    private readonly IProveedoresExternosRepository _repo;

    public IntegrationsController(IProveedoresExternosRepository repo)=> _repo=repo;

    [HttpGet("proveedores/{text}")]
    public async Task<ActionResult> GetProveedores(string text)
    {
        var proveedores = await _repo.ObtenerProveedores(text);
        return Ok(proveedores);
    }
    

    [HttpGet("Ubicaciones")]
    public async Task<ActionResult> GetUbicaciones()
    {
        var Ubicaciones = await _repo.ObtenerUbicaciones();
        return Ok(Ubicaciones);
    }

    [HttpGet("Zonas")]
    public async Task<ActionResult> GetZonas()
    {
        var zonas = await _repo.ObtenerZonas();
        return Ok (zonas);
    }

    [HttpGet("Articulos")]
    public async Task<ActionResult> GetArticulos()
    {
        var articulos = await _repo.ObtenerArticulos();
        return Ok(articulos);
    }

    [HttpGet("Documentos")]
    public async Task<ActionResult> GetDocumentos()
    {
        var documento = await _repo.ObtenerDocumentoCompra();
        return Ok(documento);
    }  

    [HttpGet("ProveeedoresXRuta/{ubicacionID}")]
    public async Task<ActionResult> GetProveedoresXRuta(int ubicacionID)
    {
        var prorveedores = await _repo.ObtenerProveedoresXUbicacion(ubicacionID);
        return Ok(prorveedores);
    } 
}
