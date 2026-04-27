using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERP.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class changedtarifaimpuestotodecimal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "TarifaImpuesto",
                table: "ConfCategorias",
                type: "decimal(5,2)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "TarifaImpuesto",
                table: "ConfCategorias",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(5,2)");
        }
    }
}
