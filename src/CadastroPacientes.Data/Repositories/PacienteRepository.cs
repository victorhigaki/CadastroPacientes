using CadastroPacientes.Data.Context;
using CadastroPacientes.Domain.Entities;
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
        return await _context.Set<Paciente>().ToListAsync();
    }

    public async Task<Paciente?> GetById(Guid id)
    {
        return await _context.Set<Paciente>().FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task Create(Paciente entity)
    {
        _context.Add(entity);
        await _context.SaveChangesAsync();
    }

    public async Task Update(Paciente entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task Delete(Guid id)
    {
        var entity = await GetById(id);
        if (entity != null)
        {
            _context.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}
