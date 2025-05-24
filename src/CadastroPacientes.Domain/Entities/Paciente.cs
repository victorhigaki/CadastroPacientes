using CadastroPacientes.Domain.Enum;

namespace CadastroPacientes.Domain.Entities;

public class Paciente
{
    public Guid Id { get; set; }
    public string Nome { get; set; } = "";
    public string Sobrenome { get; set; } = "";
    public DateTime DataNascimento { get; set; }
    public Genero Genero { get; set; }
    public string CPF { get; set; } = "";
    public string RG { get; set; } = "";
    public Estado UFRG { get; set; }
    public string Email { get; set; } = "";
    public string Celular { get; set; } = "";
    public string TelefoneFixo { get; set; } = "";

    public Guid ConvenioId { get; set; }
    public Convenio Convenio { get; set; } = new Convenio();
    public int NumeroCarteirinhaConvenio { get; set; }
    public DateTime ValidadeCarteirinha { get; set; }

    public Status Status { get; set; } = Status.Ativo;
}
