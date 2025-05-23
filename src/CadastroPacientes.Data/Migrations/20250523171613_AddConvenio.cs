using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CadastroPacientes.Data.Migrations;

/// <inheritdoc />
public partial class AddConvenio : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            name: "Excluido",
            table: "Pacientes");

        migrationBuilder.RenameColumn(
            name: "Convenio",
            table: "Pacientes",
            newName: "ConvenioId");

        migrationBuilder.AddColumn<int>(
            name: "Status",
            table: "Pacientes",
            type: "int",
            nullable: false,
            defaultValue: 0);

        migrationBuilder.CreateTable(
            name: "Convenios",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                Status = table.Column<int>(type: "int", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Convenios", x => x.Id);
            });

        migrationBuilder.CreateIndex(
            name: "IX_Pacientes_ConvenioId",
            table: "Pacientes",
            column: "ConvenioId");

        migrationBuilder.AddForeignKey(
            name: "FK_Pacientes_Convenios_ConvenioId",
            table: "Pacientes",
            column: "ConvenioId",
            principalTable: "Convenios",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            name: "FK_Pacientes_Convenios_ConvenioId",
            table: "Pacientes");

        migrationBuilder.DropTable(
            name: "Convenios");

        migrationBuilder.DropIndex(
            name: "IX_Pacientes_ConvenioId",
            table: "Pacientes");

        migrationBuilder.DropColumn(
            name: "Status",
            table: "Pacientes");

        migrationBuilder.RenameColumn(
            name: "ConvenioId",
            table: "Pacientes",
            newName: "Convenio");

        migrationBuilder.AddColumn<bool>(
            name: "Excluido",
            table: "Pacientes",
            type: "bit",
            nullable: false,
            defaultValue: false);
    }
}
