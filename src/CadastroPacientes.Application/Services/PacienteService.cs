using CadastroPacientes.Application.Dtos;
using CadastroPacientes.Application.Extensions;
using CadastroPacientes.Application.Interfaces;
using CadastroPacientes.Domain.Entities;
using CadastroPacientes.Domain.Interfaces;

namespace CadastroPacientes.Application.Services;

public class PacienteService : IPacienteService
{
    private readonly IPacienteRepository _pacienteRepository;

    public PacienteService(IPacienteRepository pacienteRepository)
    {
        _pacienteRepository = pacienteRepository;
    }

    public async Task<IEnumerable<PacienteDto>> GetAll()
    {
        IEnumerable<Paciente> pacientes = await _pacienteRepository.GetAll();
        return pacientes.ToDto();
    }

    public async Task<PacienteDto?> GetById(Guid id)
    {
        Paciente? paciente = await _pacienteRepository.GetById(id);
        return paciente?.ToDto();
    }

    public async Task<PacienteDto> Create(PacienteDto pacienteDto)
    {
        var paciente = pacienteDto.ToEntity();
        await _pacienteRepository.Create(paciente);
        return pacienteDto;
    }

    public async Task Update(PacienteDto pacienteDto)
    {
        var paciente = pacienteDto.ToEntity();
        await _pacienteRepository.Update(paciente);
    }

    public async Task DeleteLogical(Guid id)
    {
        await _pacienteRepository.DeleteLogical(id);
    }
}
