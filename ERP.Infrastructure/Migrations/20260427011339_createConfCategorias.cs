using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERP.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class createConfCategorias : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConfCategorias",
                columns: table => new
                {
                    CategoriasID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoriaCodigo = table.Column<string>(type: "nvarchar(4)", maxLength: 4, nullable: false),
                    CategoriaNombre = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    ImpuestoACargo = table.Column<int>(type: "int", nullable: false),
                    TarifaImpuesto = table.Column<int>(type: "int", nullable: false),
                    Estado = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfCategorias", x => x.CategoriasID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConfCategorias");
        }
    }
}
