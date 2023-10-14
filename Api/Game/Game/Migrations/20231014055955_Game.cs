using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Game.Migrations
{
    /// <inheritdoc />
    public partial class Game : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ApkFiles",
                columns: table => new
                {
                    FileName = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApkFiles", x => x.FileName);
                });

            migrationBuilder.CreateTable(
                name: "ImageFiles",
                columns: table => new
                {
                    ImageName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ImagePath = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageFiles", x => x.ImageName);
                });

            migrationBuilder.CreateTable(
                name: "InfoApkFiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenTroChoi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MoTaTroChoi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrangThai = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DoTuoi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TheLoai = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gia = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KichCoFile = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NhaCungCap = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GioiThieuTroChoi = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InfoApkFiles", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApkFiles");

            migrationBuilder.DropTable(
                name: "ImageFiles");

            migrationBuilder.DropTable(
                name: "InfoApkFiles");
        }
    }
}
