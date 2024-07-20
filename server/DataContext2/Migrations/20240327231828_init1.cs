using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataContext2.Migrations
{
    /// <inheritdoc />
    public partial class init1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Categories_ItemId",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Items_ItemId1",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_ItemId1",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "ItemId1",
                table: "Messages");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Items_ItemId",
                table: "Messages",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Items_ItemId",
                table: "Messages");

            migrationBuilder.AddColumn<int>(
                name: "ItemId1",
                table: "Messages",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ItemId1",
                table: "Messages",
                column: "ItemId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Categories_ItemId",
                table: "Messages",
                column: "ItemId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Items_ItemId1",
                table: "Messages",
                column: "ItemId1",
                principalTable: "Items",
                principalColumn: "Id");
        }
    }
}
