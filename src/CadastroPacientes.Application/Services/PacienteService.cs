using CadastroPacientes.Application.Dtos;
using CadastroPacientes.Application.Extensions;
using CadastroPacientes.Application.Interfaces;
using CadastroPacientes.Domain.Entities;
using CadastroPacientes.Domain.Interfaces;
//using Mapster;

namespace CadastroPacientes.Application.Services;

public class PacienteService : IPacienteService
{
    private readonly IPacienteRepository _pacienteRepository;
    private readonly IConvenioRepository _convenioRepository;

    public PacienteService(IPacienteRepository pacienteRepository,
        IConvenioRepository convenioRepository)
    {
        _pacienteRepository = pacienteRepository;
        _convenioRepository = convenioRepository;
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

    public async Task Create(CreatePacienteDto pacienteDto)
    {
        var paciente = pacienteDto.ToEntity();
        await _pacienteRepository.Create(paciente);
    }

    public async Task Update(UpdatePacienteDto pacienteDto)
    {
        var paciente = pacienteDto.ToEntity();
        await _pacienteRepository.Update(paciente);
    }

    public async Task DeleteLogical(Guid id)
    {
        await _pacienteRepository.DeleteLogical(id);
    }
}
