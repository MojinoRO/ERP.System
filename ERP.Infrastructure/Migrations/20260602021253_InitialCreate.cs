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
                name: "ConfAlmacenes",
                columns: table => new
                {
                    AlmacenID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AlmacenCodigo = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: false),
                    AlmacenNombre = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Estado = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfAlmacenes", x => x.AlmacenID);
                });

            migrationBuilder.CreateTable(
                name: "ConfCategorias",
                columns: table => new
                {
                    CategoriasID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoriaCodigo = table.Column<string>(type: "nvarchar(4)", maxLength: 4, nullable: false),
                    CategoriaNombre = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    ImpuestoACargo = table.Column<int>(type: "int", nullable: false),
                    TarifaImpuesto = table.Column<decimal>(type: "decimal(5,2)", nullable: false),
                    Estado = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfCategorias", x => x.CategoriasID);
                });

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
                name: "ConfMarcas",
                columns: table => new
                {
                    MarcaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CodigoMarca = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: false),
                    MarcaNombre = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Estado = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfMarcas", x => x.MarcaID);
                });

            migrationBuilder.CreateTable(
                name: "ConfPais",
                columns: table => new
                {
                    PaisID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CodigoPais = table.Column<string>(type: "nvarchar(4)", maxLength: 4, nullable: false),
                    NombrePais = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    CodigoAlfa = table.Column<string>(type: "nvarchar(4)", maxLength: 4, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfPais", x => x.PaisID);
                });

            migrationBuilder.CreateTable(
                name: "ConfUsuarios",
                columns: table => new
                {
                    UsuarioID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreUsuario = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ContraseñaUsuario = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    RolUsuario = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfUsuarios", x => x.UsuarioID);
                });

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

            migrationBuilder.CreateTable(
                name: "ConfSubCategorias",
                columns: table => new
                {
                    SubCategoriaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoriaID = table.Column<int>(type: "int", nullable: false),
                    SubCategoriaCodigo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SubCategoriaNombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Estado = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfSubCategorias", x => x.SubCategoriaID);
                    table.ForeignKey(
                        name: "FK_ConfSubCategorias_ConfCategorias_CategoriaID",
                        column: x => x.CategoriaID,
                        principalTable: "ConfCategorias",
                        principalColumn: "CategoriasID",
                        onDelete: ReferentialAction.Restrict);
                });

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

            migrationBuilder.CreateTable(
                name: "ConfCiudades",
                columns: table => new
                {
                    CiudadID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DepartamentoID = table.Column<int>(type: "int", nullable: false),
                    CiudadCodigo = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    CiudadNombre = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: false),
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

            migrationBuilder.CreateIndex(
                name: "IX_ConfDepartamentos_PaisID",
                table: "ConfDepartamentos",
                column: "PaisID");

            migrationBuilder.CreateIndex(
                name: "IX_ConfSubCategorias_CategoriaID",
                table: "ConfSubCategorias",
                column: "CategoriaID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConfAlmacenes");

            migrationBuilder.DropTable(
                name: "ConfCiudades");

            migrationBuilder.DropTable(
                name: "ConfEmpresa");

            migrationBuilder.DropTable(
                name: "ConfMarcas");

            migrationBuilder.DropTable(
                name: "ConfSubCategorias");

            migrationBuilder.DropTable(
                name: "ConfUsuarios");

            migrationBuilder.DropTable(
                name: "ConfVendedores");

            migrationBuilder.DropTable(
                name: "ConfDepartamentos");

            migrationBuilder.DropTable(
                name: "ConfCategorias");

            migrationBuilder.DropTable(
                name: "ConfPais");
        }
    }
}
