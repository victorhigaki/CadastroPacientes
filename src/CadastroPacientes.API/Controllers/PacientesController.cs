﻿using CadastroPacientes.Application.Dtos;
using CadastroPacientes.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CadastroPacientes.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PacientesController : ControllerBase
{
    private readonly IPacienteService _pacienteService;

    public PacientesController(IPacienteService pacienteService)
    {
        _pacienteService = pacienteService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var pacientes = await _pacienteService.GetAll();
        return Ok(pacientes);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var pacientes = await _pacienteService.GetById(id);
        return Ok(pacientes);
    }

    [HttpPost]
    public async Task<IActionResult> Create(PacienteDto pacienteDto)
    {
        try
        {
            var result = await _pacienteService.Create(pacienteDto);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, pacienteDto);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, PacienteDto pacienteDto)
    {
        if (id != pacienteDto.Id) BadRequest();
        await _pacienteService.Update(pacienteDto);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteLogical(Guid id)
    {
        await _pacienteService.LogicalDelete(id);
        return NoContent();
    }
}
