using CadastroPacientes.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CadastroPacientes.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ConveniosController : ControllerBase
{
    private readonly IConvenioService _convenioService;

    public ConveniosController( IConvenioService convenioService)
    {
        _convenioService = convenioService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var convenios = await _convenioService.GetAll();
        return Ok(convenios);
    }
}
