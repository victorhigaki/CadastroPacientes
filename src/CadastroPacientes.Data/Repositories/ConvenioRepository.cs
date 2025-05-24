using CadastroPacientes.Data.Context;
using CadastroPacientes.Domain.Entities;
using CadastroPacientes.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CadastroPacientes.Data.Repositories;
public class ConvenioRepository : IConvenioRepository
{
    private readonly AppDbContext _context;

    public ConvenioRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Convenio>> GetAll()
    {
        return await _context.Convenios.ToListAsync();
    }

    public async Task<Convenio?> GetById(Guid convenioId)
    {
        return await _context.Convenios.FindAsync(convenioId);
    }
}
