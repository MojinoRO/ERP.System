using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERP.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class confdepartamentos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ConfSubCategorias_ConfCategorias_CategoriaID",
                table: "ConfSubCategorias");

            migrationBuilder.CreateTable(
                name: "ConfDepartamentos",
                columns: table => new
                {
                    DepartamentoID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PaisID = table.Column<int>(type: "int", nullable: false),
                    DepartamentoCodigo = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: false),
                    DepartamentoNombre = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    CodigoISO = table.Column<string>(type: "nvarchar(4)", maxLength: 4, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfDepartamentos", x => x.DepartamentoID);
                    table.ForeignKey(
                        name: "FK_ConfDepartamentos_ConfPais_PaisID",
                        column: x => x.PaisID,
                        principalTable: "ConfPais",
                        principalColumn: "PaisID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConfDepartamentos_PaisID",
                table: "ConfDepartamentos",
                column: "PaisID");

            migrationBuilder.AddForeignKey(
                name: "FK_ConfSubCategorias_ConfCategorias_CategoriaID",
                table: "ConfSubCategorias",
                column: "CategoriaID",
                principalTable: "ConfCategorias",
                principalColumn: "CategoriasID",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ConfSubCategorias_ConfCategorias_CategoriaID",
                table: "ConfSubCategorias");

            migrationBuilder.DropTable(
                name: "ConfDepartamentos");

            migrationBuilder.AddForeignKey(
                name: "FK_ConfSubCategorias_ConfCategorias_CategoriaID",
                table: "ConfSubCategorias",
                column: "CategoriaID",
                principalTable: "ConfCategorias",
                principalColumn: "CategoriasID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
