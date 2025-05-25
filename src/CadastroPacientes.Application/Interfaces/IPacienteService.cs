using CadastroPacientes.Application.Dtos;

namespace CadastroPacientes.Application.Interfaces;

public interface IPacienteService
{
    Task<IEnumerable<PacienteDto>> GetAll();
    Task<PacienteDto?> GetById(Guid id);
    Task<PacienteDto> Create(PacienteDto entity);
    Task Update(PacienteDto entity);
    Task LogicalDelete(Guid id);
}
