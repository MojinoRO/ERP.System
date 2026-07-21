using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERP.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CreateTableAnticipos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "IntAntcipos",
                columns: table => new
                {
                    AnticipoID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TerceroID = table.Column<int>(type: "int", nullable: false),
                    AnticipoTipo = table.Column<int>(type: "int", nullable: false),
                    AnticipoFecha = table.Column<DateOnly>(type: "date", nullable: false),
                    ValorAnticipo = table.Column<decimal>(type: "decimal(18,0)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IntAntcipos", x => x.AnticipoID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "IntAntcipos");
        }
    }
}
