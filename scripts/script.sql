IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
CREATE TABLE [Pacientes] (
    [Id] uniqueidentifier NOT NULL,
    [Nome] nvarchar(max) NOT NULL,
    [Sobrenome] nvarchar(max) NOT NULL,
    [DataNascimento] datetime2 NOT NULL,
    [Genero] int NOT NULL,
    [CPF] nvarchar(max) NOT NULL,
    [RG] nvarchar(max) NOT NULL,
    [UFRG] int NOT NULL,
    [Email] nvarchar(max) NOT NULL,
    [Celular] nvarchar(max) NOT NULL,
    [TelefoneFixo] nvarchar(max) NOT NULL,
    [Convenio] uniqueidentifier NOT NULL,
    [NumeroCarteirinhaConvenio] int NOT NULL,
    [ValidadeCarteirinha] datetime2 NOT NULL,
    [Excluido] bit NOT NULL,
    CONSTRAINT [PK_Pacientes] PRIMARY KEY ([Id])
);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250523020437_initial', N'9.0.5');

DECLARE @var sysname;
SELECT @var = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Pacientes]') AND [c].[name] = N'Excluido');
IF @var IS NOT NULL EXEC(N'ALTER TABLE [Pacientes] DROP CONSTRAINT [' + @var + '];');
ALTER TABLE [Pacientes] DROP COLUMN [Excluido];

EXEC sp_rename N'[Pacientes].[Convenio]', N'ConvenioId', 'COLUMN';

ALTER TABLE [Pacientes] ADD [Status] int NOT NULL DEFAULT 0;

CREATE TABLE [Convenios] (
    [Id] uniqueidentifier NOT NULL,
    [Nome] nvarchar(max) NOT NULL,
    [Status] int NOT NULL,
    CONSTRAINT [PK_Convenios] PRIMARY KEY ([Id])
);

CREATE INDEX [IX_Pacientes_ConvenioId] ON [Pacientes] ([ConvenioId]);

ALTER TABLE [Pacientes] ADD CONSTRAINT [FK_Pacientes_Convenios_ConvenioId] FOREIGN KEY ([ConvenioId]) REFERENCES [Convenios] ([Id]) ON DELETE CASCADE;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250523171613_AddConvenio', N'9.0.5');

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Pacientes]') AND [c].[name] = N'NumeroCarteirinhaConvenio');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Pacientes] DROP CONSTRAINT [' + @var1 + '];');
ALTER TABLE [Pacientes] ALTER COLUMN [NumeroCarteirinhaConvenio] nvarchar(max) NOT NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250525201239_AlterNumeroCarteirinhaCOnvenio', N'9.0.5');

COMMIT;
GO

