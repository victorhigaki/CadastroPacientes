using CadastroPacientes.Data.Context;
using CadastroPacientes.Domain.Entities;
using CadastroPacientes.Domain.Enum;
using Microsoft.EntityFrameworkCore;

namespace CadastroPacientes.API.Configurations;

public static class AddMigrationConfiguration
{
    public static async Task EnsureSeedData(this WebApplication app)
    {
        using var scope = app.Services.CreateScope().ServiceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
        var env = scope.ServiceProvider.GetRequiredService<IWebHostEnvironment>();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        await context.Database.MigrateAsync();
        await SeedConvenios(context);
    }

    public static async Task SeedConvenios(AppDbContext context)
    {
        if (context.Convenios.Any())
            return;

        await context.Convenios.AddAsync(new Convenio
        {
            Id = Guid.NewGuid(),
            Nome = "Convenio 1",
            Status = Status.Ativo,
        });

        await context.Convenios.AddAsync(new Convenio
        {
            Id = Guid.NewGuid(),
            Nome = "Convenio 2",
            Status = Status.Ativo,
        });

        await context.Convenios.AddAsync(new Convenio
        {
            Id = Guid.NewGuid(),
            Nome = "Convenio 3",
            Status = Status.Ativo,
        });

        await context.Convenios.AddAsync(new Convenio
        {
            Id = Guid.NewGuid(),
            Nome = "Convenio 4",
            Status = Status.Ativo,
        });

        await context.Convenios.AddAsync(new Convenio
        {
            Id = Guid.NewGuid(),
            Nome = "Convenio 5",
            Status = Status.Ativo,
        });

        await context.SaveChangesAsync();
    }
}
