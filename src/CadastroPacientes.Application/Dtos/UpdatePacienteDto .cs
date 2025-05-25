using CadastroPacientes.Domain.Enum;

namespace CadastroPacientes.Application.Dtos;

public record UpdatePacienteDto(
    Guid Id,
    string Nome,
    string Sobrenome,
    DateTime DataNascimento,
    Genero Genero,
    string CPF,
    string RG,
    string UFRG,
    string Email,
    string Celular,
    string TelefoneFixo,
    Guid ConvenioId,
    int NumeroCarteirinhaConvenio,
    DateTime ValidadeCarteirinha
);
