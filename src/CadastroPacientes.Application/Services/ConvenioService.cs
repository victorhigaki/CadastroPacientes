using CadastroPacientes.Application.Dtos;
using CadastroPacientes.Application.Extensions;
using CadastroPacientes.Application.Interfaces;
using CadastroPacientes.Domain.Interfaces;

namespace CadastroPacientes.Application.Services;
public class ConvenioService : IConvenioService
{
    private readonly IConvenioRepository _convenioRepository;

    public ConvenioService(IConvenioRepository convenioRepository)
    {
        _convenioRepository = convenioRepository;
    }

    public async Task<IEnumerable<ConvenioDto>> GetAll()
    {
        var convenios = await _convenioRepository.GetAll();
        var convenioDto = convenios.ToDto()
            .OrderBy(c => c.Nome);
        return convenioDto;
    }
}
