using CadastroPacientes.Application.Interfaces;
using CadastroPacientes.Application.Services;
using CadastroPacientes.Data.Context;
using CadastroPacientes.Data.Repositories;
using CadastroPacientes.Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace CadastroPacientes.CrossCutting;

public static class DependencyContainer
{
    public static IServiceCollection RegisterServices(this IServiceCollection services)
    {
        services.AddTransient<AppDbContext>();
        services.AddScoped<IPacienteService, PacienteService>();
        services.AddScoped<IPacienteRepository, PacienteRepository>();
        return services;
    }
}
