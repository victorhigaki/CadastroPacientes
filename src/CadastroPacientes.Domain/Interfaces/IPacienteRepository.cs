using CadastroPacientes.Domain.Entities;

namespace CadastroPacientes.Domain.Interfaces;

public interface IPacienteRepository
{
    Task<IEnumerable<Paciente>> GetAll();
    Task<Paciente?> GetById(Guid id);
    Task Create(Paciente entity);
    Task Update(Paciente entity);
    Task LogicalDelete(Guid id);
    Task<Paciente?> GetByCpf(string cPF);
}
