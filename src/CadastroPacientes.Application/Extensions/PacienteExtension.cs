using CadastroPacientes.Application.Dtos;
using CadastroPacientes.Domain.Entities;
using CadastroPacientes.Domain.Enum;
using System;

namespace CadastroPacientes.Application.Extensions;
public static class PacienteExtension
{
    public static PacienteDto ToDto(this Paciente paciente)
    {
        return new PacienteDto
        (
            paciente.Id,
            paciente.Nome,
            paciente.Sobrenome,
            paciente.DataNascimento,
            paciente.Genero,
            paciente.CPF,
            paciente.RG,
            paciente.UFRG.ToString(),
            paciente.Email,
            paciente.Celular,
            paciente.TelefoneFixo,
            paciente.ConvenioId,
            paciente.Convenio.ToDto(),
            paciente.NumeroCarteirinhaConvenio,
            paciente.ValidadeCarteirinha
        );
    }

    public static IEnumerable<PacienteDto> ToDto(this IEnumerable<Paciente> pacientes)
    {
        return pacientes.Select(c => c.ToDto()).ToList();
    }

    public static Paciente ToEntity(this PacienteDto paciente)
    {
        return new Paciente
        {
            Id = paciente.Id,
            Nome = paciente.Nome,
            Sobrenome = paciente.Sobrenome,
            DataNascimento = paciente.DataNascimento,
            Genero = paciente.Genero,
            CPF = paciente.CPF,
            RG = paciente.RG,
            UFRG = (Estado)Enum.Parse(typeof(Estado), paciente.UFRG),
            Email = paciente.Email,
            Celular = paciente.Celular,
            TelefoneFixo = paciente.TelefoneFixo,
            ConvenioId = paciente.ConvenioId,
            Convenio = paciente.Convenio != null ? paciente.Convenio?.ToEntity() : null,
            NumeroCarteirinhaConvenio = paciente.NumeroCarteirinhaConvenio,
            ValidadeCarteirinha = paciente.ValidadeCarteirinha,
        };
    }

    public static IEnumerable<Paciente> ToEntity(this IEnumerable<PacienteDto> pacientes)
    {
        return pacientes.Select(c => c.ToEntity()).ToList();
    }

    public static Paciente ToEntity(this CreatePacienteDto paciente)
    {
        return new Paciente
        {
            Nome = paciente.Nome,
            Sobrenome = paciente.Sobrenome,
            DataNascimento = paciente.DataNascimento,
            Genero = paciente.Genero,
            CPF = paciente.CPF,
            RG = paciente.RG,
            UFRG = (Estado)Enum.Parse(typeof(Estado), paciente.UFRG),
            Email = paciente.Email,
            Celular = paciente.Celular,
            TelefoneFixo = paciente.TelefoneFixo,
            ConvenioId = paciente.ConvenioId,
            NumeroCarteirinhaConvenio = paciente.NumeroCarteirinhaConvenio,
            ValidadeCarteirinha = paciente.ValidadeCarteirinha,
        };
    }

    public static Paciente ToEntity(this UpdatePacienteDto paciente)
    {
        return new Paciente
        {
            Id = paciente.Id,
            Nome = paciente.Nome,
            Sobrenome = paciente.Sobrenome,
            DataNascimento = paciente.DataNascimento,
            Genero = paciente.Genero,
            CPF = paciente.CPF,
            RG = paciente.RG,
            UFRG = (Estado)Enum.Parse(typeof(Estado), paciente.UFRG),
            Email = paciente.Email,
            Celular = paciente.Celular,
            TelefoneFixo = paciente.TelefoneFixo,
            ConvenioId = paciente.ConvenioId,
            NumeroCarteirinhaConvenio = paciente.NumeroCarteirinhaConvenio,
            ValidadeCarteirinha = paciente.ValidadeCarteirinha,
        };
    }
}