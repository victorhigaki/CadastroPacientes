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

    public PacienteService(IPacienteRepository pacienteRepository)
    {
        _pacienteRepository = pacienteRepository;
    }

    public async Task<IEnumerable<Paciente>> GetAll()
    {
        return await _pacienteRepository.GetAll();
    }

    public async Task<Paciente?> GetById(Guid id)
    {
        return await _pacienteRepository.GetById(id);
    }

    public async Task Create(PacienteDto pacienteDto)
    {
        var paciente = pacienteDto.ToEntity();
        await _pacienteRepository.Create(paciente);
    }

    public async Task Update(PacienteDto pacienteDto)
    {
        //var paciente = pacienteDto.Adapt<Paciente>();
        //await _pacienteRepository.Update(paciente);
    }

    public async Task Delete(Guid id)
    {
        await _pacienteRepository.Delete(id);
    }
}
