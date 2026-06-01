using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERP.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class confciudades : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConfCiudades",
                columns: table => new
                {
                    CiudadID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DepartamentoID = table.Column<int>(type: "int", nullable: false),
                    CiudadNombre = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: false),
                    CiudadCodigo = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    CodigoDian = table.Column<string>(type: "nvarchar(5)", maxLength: 5, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfCiudades", x => x.CiudadID);
                    table.ForeignKey(
                        name: "FK_ConfCiudades_ConfDepartamentos_DepartamentoID",
                        column: x => x.DepartamentoID,
                        principalTable: "ConfDepartamentos",
                        principalColumn: "DepartamentoID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConfCiudades_DepartamentoID",
                table: "ConfCiudades",
                column: "DepartamentoID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConfCiudades");
        }
    }
}
