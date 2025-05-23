using CadastroPacientes.Application.Dtos;
using CadastroPacientes.Domain.Entities;

namespace CadastroPacientes.Application.Interfaces;

public interface IPacienteService
{
    Task<IEnumerable<Paciente>> GetAll();
    Task<Paciente?> GetById(Guid id);
    Task Create(PacienteDto entity);
    Task Update(PacienteDto entity);
    Task Delete(Guid id);
}
