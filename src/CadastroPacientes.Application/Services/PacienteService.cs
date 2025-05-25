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
        if (!string.IsNullOrEmpty(pacienteDto.CPF)) {
            if (pacienteDto.CPF.Length != 11 || !pacienteDto.CPF.IsValid())
                throw new Exception("CPF inválido");
            var pacienteComCpf = await _pacienteRepository.GetByCpf(pacienteDto.CPF);
            if (pacienteComCpf != null) throw new Exception("CPF já utilizado!!");
        }
        var paciente = pacienteDto.ToEntity();
        await _pacienteRepository.Create(paciente);
        return pacienteDto;
    }

    public async Task Update(PacienteDto pacienteDto)
    {
        var paciente = pacienteDto.ToEntity();
        await _pacienteRepository.Update(paciente);
    }

    public async Task LogicalDelete(Guid id)
    {
        await _pacienteRepository.LogicalDelete(id);
    }
}
