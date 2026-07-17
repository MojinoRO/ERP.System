using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERP.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTipoDato : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "FechaLegalizacion",
                table: "IntLegalizacionTransportadores",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "FechaLegalizacion",
                table: "IntLegalizacionTransportadores",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "date");
        }
    }
}
