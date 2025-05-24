using CadastroPacientes.Domain.Enum;

namespace CadastroPacientes.Domain.Entities;

public class Convenio
{
    public Guid Id { get; set; }
    public string Nome { get; set; } = "";
    public Status Status { get; set; }

    public virtual ICollection<Paciente> Pacientes { get; set; }
}
