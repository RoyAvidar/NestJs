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
                    name: "user",
                    type: "user",
                    unsigned: true
                },
                {
                    name: "order",
                    type: "order",
                    unsigned: true
                }
                
            ],
            foreignKeys: [
                {
                    columnNames: ["categoryId"],
                    referencedColumnNames: ["categoryId"],
                    referencedTableName: "categories",
                    onDelete: "CASCADE",
                },
                {
                    columnNames: ["user"],
                    referencedColumnNames: ["user"],
                    referencedTableName: "users",
                    onDelete: "CASCADE"
                },
                {
                    columnNames: ["order"],
                    referencedColumnNames: ["order"],
                    referencedTableName: "orders",
                    onDelete: "CASCADE"
                }
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products");
    }

}
