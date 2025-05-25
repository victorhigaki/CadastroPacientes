# Projeto de Cadastro de Pacientes

Projeto como prova prática de uma vaga de emprego.

Autor: Victor Higaki

## architecture:

- src
    - CadastroPacientes - Frotend 
    - CadastroPacientes.API - Backend API 
    - CadastroPacientes.Application - Use cases / Services
    - CadastroPacientes.CrossCutting - Dependency Injection 
    - CadastroPacientes.Data - Repository Infrastructure
    - CadastroPacientes.Domain - Entities and Models
- README.md - Project Documententation
- scripts - scripts to create the database and run the migrations manually

## Stack:

- Frontend:
    - Angular
    - TypeScript    
    - Angular Material
    - ngx-datatable
    - ngx-mask
      
- Backend:
    - C#
    - .NET
    - EntityFramework
    - Dapper
    - Swagger
      
- Database / Others:
    - SQL Server (docker)
    - Docker
    - Docker Compose

## Instalation

### On main folder where `docker-compose.yml` is located:

```docker
    docker compose up -d
```
sometimes docker compose dont expose API ports, so it's needed to `Run Service` manually the `cadastropacientes.api` on `docker-compose.yml` file. 

#### Automatic Migrations in Program.cs using `await app.EnsureSeedData()` call
#### Migration scripts on scripts folder in case you want to run manually on database

### running locally:

#### backend on CadastroPacientes.API folder
```console
    dotnet run
```

#### frontend on CadastroPacientes folder
```console
    npm install -g @angular/cli
    ng serve
```
