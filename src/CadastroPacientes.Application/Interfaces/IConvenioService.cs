using CadastroPacientes.Application.Dtos;

namespace CadastroPacientes.Application.Interfaces;

public interface IConvenioService
{
    Task<IEnumerable<ConvenioDto>> GetAll();
}