using CadastroPacientes.Domain.Entities;

namespace CadastroPacientes.Domain.Interfaces;
public interface IConvenioRepository
{
    Task<IEnumerable<Convenio>> GetAll();
    Task<Convenio?> GetById(Guid convenioId);
}
