using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERP.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CreateConfVendedores : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConfVendedores",
                columns: table => new
                {
                    VendedorID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CodigoVendedor = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    VendedorIdentificacion = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    VendedorNombre = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    VendedorEstado = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfVendedores", x => x.VendedorID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConfVendedores");
        }
    }
}
