using CadastroPacientes.Application.Dtos;

namespace CadastroPacientes.Application.Interfaces;

public interface IPacienteService
{
    Task<IEnumerable<PacienteDto>> GetAll();
    Task<PacienteDto?> GetById(Guid id);
    Task Create(CreatePacienteDto entity);
    Task Update(PacienteDto entity);
    Task DeleteLogical(Guid id);
}
