using CadastroPacientes.Data.Context;
using CadastroPacientes.Domain.Entities;
using CadastroPacientes.Domain.Enum;
using CadastroPacientes.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CadastroPacientes.Data.Repositories;

public class PacienteRepository : IPacienteRepository
{
    protected readonly AppDbContext _context;
    public PacienteRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Paciente>> GetAll()
    {
        List<Paciente> pacientes = await _context.Pacientes
            .Include(p => p.Convenio)
            .Where(p => p.Status == Status.Ativo)
            .ToListAsync();
        return pacientes;
    }

    public async Task<Paciente?> GetById(Guid id)
    {
        return await _context.Pacientes
            .Include(p => p.Convenio)
            .Where(p => p.Status == Status.Ativo)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task Create(Paciente entity)
    {
        _context.Pacientes.Add(entity);
        await _context.SaveChangesAsync();
    }

    public async Task Update(Paciente paciente)
    {
        _context.Pacientes.Entry(paciente).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteLogical(Guid id)
    {
        var entity = await GetById(id);
        if (entity == null) return;
        entity.Status = Status.Inativo;
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }
}
