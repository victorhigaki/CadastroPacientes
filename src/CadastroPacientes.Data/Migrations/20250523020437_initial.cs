using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CadastroPacientes.Data.Migrations;

/// <inheritdoc />
public partial class initial : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Pacientes",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                Sobrenome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                DataNascimento = table.Column<DateTime>(type: "datetime2", nullable: false),
                Genero = table.Column<int>(type: "int", nullable: false),
                CPF = table.Column<string>(type: "nvarchar(max)", nullable: false),
                RG = table.Column<string>(type: "nvarchar(max)", nullable: false),
                UFRG = table.Column<int>(type: "int", nullable: false),
                Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                Celular = table.Column<string>(type: "nvarchar(max)", nullable: false),
                TelefoneFixo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                Convenio = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                NumeroCarteirinhaConvenio = table.Column<int>(type: "int", nullable: false),
                ValidadeCarteirinha = table.Column<DateTime>(type: "datetime2", nullable: false),
                Excluido = table.Column<bool>(type: "bit", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Pacientes", x => x.Id);
            });
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "Pacientes");
    }
}
