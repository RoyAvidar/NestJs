import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class products1624022131515 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "products",
            columns: [
                {
                    name: "productId",
                    type: "bigInt",
                    isGenerated: true,
                    generationStrategy: "increment",
                    isPrimary: true,
                    unsigned: true,
                },
                {
                    name: "productName",
                    type: "varchar"
                },
                {
                    name: "productPrice",
                    type: "float"
                },
                {
                    name: "productDesc",
                    type: "varchar"
                },
                {
                    name: "imageUrl",
                    type: "varchar"
                },
                {
                    name: "categoryId",
                    type: "bigInt", 
                    unsigned: true
                },
                {
                    name: "orderId",
                    type: "bigInt", 
                    unsigned: true
                },
                {
                    name: "userId",
                    type: "bigInt", 
                    unsigned: true
                },
            ],
            foreignKeys: [
                {
                    columnNames: ["categoryId"],
                    referencedColumnNames: ["categoryId"],
                    referencedTableName: "categories",
                    onDelete: "CASCADE",
                },
                {
                    columnNames: ["orderId"],
                    referencedColumnNames: ["orderId"],
                    referencedTableName: "orders",
                    onDelete: "CASCADE",
                },
                {
                    columnNames: ["userId"],
                    referencedColumnNames: ["userId"],
                    referencedTableName: "users",
                    onDelete: "CASCADE",
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products");
    }

}
