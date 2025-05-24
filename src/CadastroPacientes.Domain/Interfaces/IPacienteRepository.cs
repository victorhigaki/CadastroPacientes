using CadastroPacientes.Domain.Entities;

namespace CadastroPacientes.Domain.Interfaces;

public interface IPacienteRepository
{
    public Task<IEnumerable<Paciente>> GetAll();
    public Task<Paciente?> GetById(Guid id);
    public Task Create(Paciente entity);
    public Task Update(Paciente entity);
    public Task DeleteLogical(Guid id);
}
