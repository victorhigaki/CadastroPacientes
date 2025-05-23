using CadastroPacientes.Domain.Enum;

namespace CadastroPacientes.Application.Dtos;

public record PacienteDto(
    string Nome,
    string Sobrenome,
    DateTime DataNascimento,
    Genero Genero,
    string CPF,
    string RG,
    Estado UFRG,
    string Email,
    string Celular,
    string TelefoneFixo,

    Guid Convenio,
    int NumeroCarteirinhaConvenio,
    DateTime ValidadeCarteirinha,

    bool Excluido
);
