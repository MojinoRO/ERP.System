using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERP.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ConfCuentasPuc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConfCuentasPuc",
                columns: table => new
                {
                    CuentasPucID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CuentasPucCodigo = table.Column<string>(type: "nvarchar(14)", maxLength: 14, nullable: false),
                    CuentaPucNombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CuentaPucNaturaleza = table.Column<string>(type: "nchar(1)", maxLength: 1, nullable: false),
                    CuentaPucMovimiento = table.Column<decimal>(type: "numeric(1,0)", maxLength: 1, nullable: false),
                    CuentaPucTercero = table.Column<decimal>(type: "numeric(1,0)", maxLength: 1, nullable: false),
                    CuentaPucTipo = table.Column<decimal>(type: "numeric(1,0)", maxLength: 1, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfCuentasPuc", x => x.CuentasPucID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConfCuentasPuc");
        }
    }
}
