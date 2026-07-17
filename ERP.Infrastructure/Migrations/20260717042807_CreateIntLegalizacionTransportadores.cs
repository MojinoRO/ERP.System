using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERP.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CreateIntLegalizacionTransportadores : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "IntLegalizacionTransportadores",
                columns: table => new
                {
                    LegalizacionID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FechaLegalizacion = table.Column<DateTime>(type: "DateTime", nullable: false),
                    CantidadTotal = table.Column<decimal>(type: "Decimal(18,0)", nullable: false),
                    ValorUnitario = table.Column<decimal>(type: "Decimal(18,0)", nullable: false),
                    ValorTotal = table.Column<decimal>(type: "Decimal(18,0)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IntLegalizacionTransportadores", x => x.LegalizacionID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "IntLegalizacionTransportadores");
        }
    }
}
