using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERP.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class updateTablaempresa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmpresaDireccion",
                table: "ConfEmpresa",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EmpresaEmail",
                table: "ConfEmpresa",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EmpresaKeyLicencia",
                table: "ConfEmpresa",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EmpresaRazonSocial",
                table: "ConfEmpresa",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EmpresaRepresentanteLegal",
                table: "ConfEmpresa",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EmpresaTelefono",
                table: "ConfEmpresa",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmpresaDireccion",
                table: "ConfEmpresa");

            migrationBuilder.DropColumn(
                name: "EmpresaEmail",
                table: "ConfEmpresa");

            migrationBuilder.DropColumn(
                name: "EmpresaKeyLicencia",
                table: "ConfEmpresa");

            migrationBuilder.DropColumn(
                name: "EmpresaRazonSocial",
                table: "ConfEmpresa");

            migrationBuilder.DropColumn(
                name: "EmpresaRepresentanteLegal",
                table: "ConfEmpresa");

            migrationBuilder.DropColumn(
                name: "EmpresaTelefono",
                table: "ConfEmpresa");
        }
    }
}
