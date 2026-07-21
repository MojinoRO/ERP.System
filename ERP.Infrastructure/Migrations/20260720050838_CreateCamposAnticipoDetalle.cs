using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERP.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CreateCamposAnticipoDetalle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_IntAntcipos",
                table: "IntAntcipos");

            migrationBuilder.RenameTable(
                name: "IntAntcipos",
                newName: "IntAnticipos");

            migrationBuilder.AddColumn<string>(
                name: "AnticipoDetalle",
                table: "IntAnticipos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_IntAnticipos",
                table: "IntAnticipos",
                column: "AnticipoID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_IntAnticipos",
                table: "IntAnticipos");

            migrationBuilder.DropColumn(
                name: "AnticipoDetalle",
                table: "IntAnticipos");

            migrationBuilder.RenameTable(
                name: "IntAnticipos",
                newName: "IntAntcipos");

            migrationBuilder.AddPrimaryKey(
                name: "PK_IntAntcipos",
                table: "IntAntcipos",
                column: "AnticipoID");
        }
    }
}
