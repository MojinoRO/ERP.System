using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERP.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConfEmpresa",
                columns: table => new
                {
                    EmpresaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmpresaNit = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    EmpresaDV = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false),
                    EmpresaNombre = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    EmpresaRazonSocial = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    EmpresaRepresentanteLegal = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    EmpresaTelefono = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    EmpresaDireccion = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    EmpresaEmail = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    EmpresaKeyLicencia = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfEmpresa", x => x.EmpresaID);
                });

            migrationBuilder.CreateTable(
                name: "ConfUsuarios",
                columns: table => new
                {
                    UsuarioID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreUsuario = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ContraseñaUsuario = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    RolUsuario = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfUsuarios", x => x.UsuarioID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConfEmpresa");

            migrationBuilder.DropTable(
                name: "ConfUsuarios");
        }
    }
}
