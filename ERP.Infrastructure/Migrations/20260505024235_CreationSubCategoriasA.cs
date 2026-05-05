using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERP.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CreationSubCategoriasA : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConfSubCategorias",
                columns: table => new
                {
                    SubCategoriaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoriaID = table.Column<int>(type: "int", nullable: false),
                    SubCategoriaCodigo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SubCategoriaNombre = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfSubCategorias", x => x.SubCategoriaID);
                    table.ForeignKey(
                        name: "FK_ConfSubCategorias_ConfCategorias_CategoriaID",
                        column: x => x.CategoriaID,
                        principalTable: "ConfCategorias",
                        principalColumn: "CategoriasID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConfSubCategorias_CategoriaID",
                table: "ConfSubCategorias",
                column: "CategoriaID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConfSubCategorias");
        }
    }
}
