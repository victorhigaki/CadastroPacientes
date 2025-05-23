using CadastroPacientes.Application.Dtos;
using CadastroPacientes.Domain.Entities;

namespace CadastroPacientes.Application.Extensions;
public static class ConvenioExtension
{
    public static ConvenioDto ToDto(this Convenio convenio)
    {
        return new ConvenioDto
        (
            convenio.Id,
            convenio.Nome
        );
    }

    public static IEnumerable<ConvenioDto> ToDto(this IEnumerable<Convenio> convenios)
    {
        return convenios.Select(c => c.ToDto()).ToList();
    }

    public static Convenio ToEntity(this ConvenioDto convenio)
    {
        return new Convenio
        {
            Id = convenio.Id,
            Nome = convenio.Nome
        };
    }

    public static IEnumerable<Convenio> ToEntity(this IEnumerable<ConvenioDto> convenios)
    {
        return convenios.Select(c => c.ToEntity()).ToList();
    }
}